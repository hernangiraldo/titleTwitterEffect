import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[header-title]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HeaderTitleDirective {

  @Input('htitle') htitle: HTMLElement;
  titleNative: HTMLElement;

  constructor(
    el: ElementRef,
    public renderer: Renderer
  ) {}
  
  ngOnInit() {
    this.titleNative = this.htitle['_elementRef'].nativeElement;
  }

  onContentScroll(event) {
    if (event.scrollTop <= 30) {
      this.renderer.setElementStyle(this.titleNative, 'webkitTransform',`translateY(${ 30 - event.scrollTop }px)`);
    } else if (event.scrollTop > 30) {
      this.renderer.setElementStyle(this.titleNative, 'webkitTransform', `translateY(0px)`);
    }
  }
}
