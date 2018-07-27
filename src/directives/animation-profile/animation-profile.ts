import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[animation-profile]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class AnimationProfileDirective {

  @Input('head') header: HTMLElement;
  backgroundUserInfo: HTMLElement;
  userImage: HTMLElement;
  userName: HTMLElement;
  pageTitle: HTMLElement;

  constructor(
    public elem: ElementRef,
    public renderer: Renderer
  ) {}

  ngOnInit() {
    let tempElem = this.elem.nativeElement;
    this.backgroundUserInfo = tempElem.querySelector('.background-user-info');
    this.userImage = tempElem.querySelector('.content-user-info__image');
    this.userName = tempElem.querySelector('.content-user-info__name');
    this.pageTitle = this.header.querySelector('ion-title');
  }

  onContentScroll(event) {
    if (event.scrollTop <= this.userImage.clientHeight / 2) {
      this.renderer.setElementStyle( this.userImage, 'webkitTransform', `scale(${(this.userImage.clientHeight / 2) / (this.userImage.clientHeight / 2 + event.scrollTop)})` );
      this.renderer.setElementStyle( this.userName, 'webkitTransform', `translateY(-${event.scrollTop/3}px)` );
    } else if (event.scrollTop > this.userImage.clientHeight / 2) {
      this.renderer.setElementStyle( this.userImage, 'webkitTransform', `scale(0.5)` );
      this.renderer.setElementStyle( this.userName, 'webkitTransform', `translateY(-${event.scrollTop/3}px)` );
    }

    if (this.userName.getBoundingClientRect().top  > 0) {
      this.renderer.setElementStyle(this.pageTitle, 'webkitTransform', `translateY(${ 30 - ( event.scrollTop - (this.backgroundUserInfo.clientHeight / 2))}px)`);
    } else if (this.userName.getBoundingClientRect().top  < 0) {
      this.renderer.setElementStyle(this.pageTitle, 'webkitTransform', `translateY(0px)`);
    }
  }
}
