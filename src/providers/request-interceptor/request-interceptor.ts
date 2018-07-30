import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from './../auth/auth';
import { catchError } from 'rxjs/operators/catchError';
import { switchMap, finalize } from '../../../node_modules/rxjs/operators';

@Injectable()
export class RequestInterceptorProvider implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private injector: Injector
  ) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const authService = this.injector.get(AuthProvider);
    const token = authService.getAuthToken();

    return next.handle(this.addToken(req, token)).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handle400Error(error);
            case 401:
              return this.handle401Error(req, next);
          }
        } else {
          return Observable.throw(new Error(error));
        }
      })
    )
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      return this.logoutUser();
    }

    return Observable.throw(new Error(error));
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      const authService = this.injector.get(AuthProvider);

      return authService.refreshToken().pipe(
        switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }

          return this.logoutUser();
        }),
        catchError(error => {
          return this.logoutUser();
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      )
    }
  }

  logoutUser() {
    return Observable.throw(new Error('Su sesión ha expirado'));
  }

}
