import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[img-block]'
})
export class ImgBlockDirective {

  @Input() imgMaxWidth: string = '100%';
  @Input() imgMaxHeight: string = '';
  @Input() padding: string = '0 15px';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.applyMaxWidth();
  }

  private applyMaxWidth(): void {
    this.el.nativeElement.style.padding = this.padding;

    if (this.imgMaxWidth) {
      const childElements = this.el.nativeElement.children;
      for (let i = 0; i < childElements.length; i++) {
        const childElement = childElements[i];
        this.renderer.setStyle(childElement, 'max-width', this.imgMaxWidth);
        this.renderer.setStyle(childElement, 'max-height', this.imgMaxHeight);
      }
    }
  }
}
