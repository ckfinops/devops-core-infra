import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[setChildStyle]'
})
export class SetChildStyleDirective implements OnInit {
  @Input() setChildStyle: { [key: string]: string } = {};

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

    const childElements = this.el.nativeElement.children;
    for (let i = 0; i < childElements.length; i++) {
      for (const styleKey in this.setChildStyle) {
        console.log(styleKey)
        if (this.setChildStyle.hasOwnProperty(styleKey)) {
          this.renderer.setStyle(
            childElements[i],
            styleKey,
            this.setChildStyle[styleKey]
          );
        }
      }
    }
  }
}
