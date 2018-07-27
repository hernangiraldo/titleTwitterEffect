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

  heightHeader: number;
  heightImage: number;
  topImage: number;
  topTxt: number;
  lastTop: number;

  constructor(
    public elem: ElementRef,
    public renderer: Renderer
  ) {}

  ngOnInit() {
    this.userImage = this.elem.nativeElement.querySelector('.image-profile');
    this.userName = this.elem.nativeElement.querySelector('.name-profile');
    this.titleNative = this.header.querySelector('ion-title');
    
    this.heightImage = this.userImage.clientHeight;
    this.topImage = this.userImage.offsetTop;
    this.topTxt = this.userName.offsetTop;
    this.heightHeader = this.header.clientHeight;
  }

  onContentScroll(event) {
    if (event.directionY === 'down') {
      if (event.scrollTop <= (this.heightImage / 2)) {
        this.userImage.style.width = `${this.heightImage - event.scrollTop}px`;
        this.userImage.style.height = `${this.heightImage - event.scrollTop}px`;
      } else if (event.scrollTop > (this.heightImage / 2)) {
        this.userImage.style.width = `${this.heightImage / 2}px`;
        this.userImage.style.height = `${this.heightImage / 2}px`;
      }
  
      if (event.scrollTop <= this.topImage) {
        this.renderer.setElementStyle(this.userImage, 'webkitTransform', `translate3d(-50%, -${this.topImage - (this.topImage - event.scrollTop)}px, 0)`)
        // this.userImage.style.top = this.topImage - event.scrollTop + 'px';
        
      } else if (event.scrollTop > this.topImage) {
        this.userImage.style.top = `${ (this.heightImage / 2) - this.heightHeader }px`;
        this.userName.style.top = `${ (this.heightImage / 2) - this.heightHeader }px`;
      }

      if (event.scrollTop <= this.heightImage) {
        this.userName.style.top = this.topTxt - event.scrollTop * 2 + 'px';
      }

      if (event.scrollTop > 55 && event.scrollTop <= 85) {
        this.renderer.setElementStyle(this.titleNative, 'webkitTransform',`translateY(${ 85 - event.scrollTop }px)`);
      } else if (event.scrollTop > 85) {
        this.renderer.setElementStyle(this.titleNative, 'webkitTransform', `translateY(0px)`);
      }

    } else {
      if (event.scrollTop < this.topImage && event.scrollTop >= this.topImage / 2) {
        this.userImage.style.width = `${this.heightImage / 2 + (this.topImage - event.scrollTop)}px`;
        this.userImage.style.height = `${this.heightImage / 2 + (this.topImage - event.scrollTop)}px`;
      } else if (event.scrollTop < this.topImage / 2) {
        this.userImage.style.width = `${this.heightImage}px`;
        this.userImage.style.height = `${this.heightImage}px`;;
      }

      if (event.scrollTop < 75) {
        this.userImage.style.top = 5 + (75 - event.scrollTop) + 'px';
        this.userName.style.top = `${this.topTxt}px`
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
