import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import {delay} from 'rxjs/operators';

@Injectable()
export class AuthProvider {
  public authTokenStale: string = 'stale_auth_token';
  public authTokenNew: string = 'new_auth_token';
  public currentToken: string;

  constructor(public http: HttpClient) {
    this.currentToken = this.authTokenStale;
  }

  getAuthToken(): string {
    return this.currentToken;
  }

  refreshToken(): Observable<string> {
    /**
     * TODO: call refresh token service
     */
    this.currentToken = this.authTokenNew;
    return observableOf(this.authTokenNew).pipe(delay(200));
  }

}
