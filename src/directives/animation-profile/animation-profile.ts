import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[animation-profile]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class AnimationProfileDirective {

  @Input('head') header: HTMLElement;
  userImage: HTMLElement;
  userName: HTMLElement;
  contentHeader: HTMLElement;
  titleNative: HTMLElement;
  lastTopImage: number;

  constructor(
    public elem: ElementRef,
    public renderer: Renderer
  ) {}

  ngOnInit() {
    this.userImage = this.elem.nativeElement.querySelector('.image-profile');
    this.userName = this.elem.nativeElement.querySelector('.name-profile');
    this.titleNative = this.header.querySelector('ion-title');
  }

  onContentScroll(event) {
    if (event.directionY === 'down') {
      console.log(event.scrollTop);
      if (event.scrollTop <= 35) {
        this.userImage.style.width = 70 - event.scrollTop + 'px';
        this.userImage.style.height = 70 - event.scrollTop + 'px';
      }
  
      if (event.scrollTop <= 80) {
        this.userImage.style.top = 80 - event.scrollTop + 'px';
        this.userName.style.top = 150 - event.scrollTop * 2 + 'px';
      }

      if (event.scrollTop > 55 && event.scrollTop <= 85) {
        this.renderer.setElementStyle(this.titleNative, 'webkitTransform',`translateY(${ 85 - event.scrollTop }px)`);
      } else if (event.scrollTop > 85) {
        this.renderer.setElementStyle(this.titleNative, 'webkitTransform', `translateY(0px)`);
      }

    } else {
      console.log(event.scrollTop);
      if (event.scrollTop < 75 && event.scrollTop >= 40) {
        this.userImage.style.width = 35 + (75 - event.scrollTop) + 'px';
        this.userImage.style.height = 35 + (75 - event.scrollTop) + 'px';
      }

      if (event.scrollTop < 75) {
        this.userImage.style.top = 5 + (75 - event.scrollTop) + 'px';
        console.log('start');
      }
      // if (event.scrollTop >= 35) {
      //   this.userImage.style.width = 35 + event.scrollTop + 'px';
      //   this.userImage.style.height = 35 + event.scrollTop + 'px';
      //   this.userImage.style.top = 45 + event.scrollTop + 'px';
      //   this.userName.style.top = 115 + event.scrollTop * 2 + 'px';
      // }
    }
  }
}
