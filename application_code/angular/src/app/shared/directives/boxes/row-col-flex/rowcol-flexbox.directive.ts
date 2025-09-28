import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[rowcol-flexbox]'
})
export class RowColFlexboxDirective {

  @Input() breakpoint: number = 1025;
  @Input() columnFlexValues: number[] = [];
  @Input() padding: string = '0 15px';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateLayout();
  }

  ngOnInit(): void {
    this.updateLayout();
  }

  private updateLayout(): void {
    const screenWidth = window.innerWidth;
    const isRowLayout = screenWidth >= this.breakpoint;
    this.el.nativeElement.style.padding = this.padding;

    // Clear previous layout classes
    this.renderer.removeClass(this.el.nativeElement, 'row-layout');
    this.renderer.removeClass(this.el.nativeElement, 'col-layout');

    // Apply new layout class
    if (isRowLayout) {
      this.renderer.addClass(this.el.nativeElement, 'row-layout');
      this.applyColumnFlexValues();
    } else {
      this.renderer.addClass(this.el.nativeElement, 'col-layout');
      this.resetColumnFlexValues();
    }


  }

  private applyColumnFlexValues(): void {
    if (this.columnFlexValues.length > 0) {
      const childElements = this.el.nativeElement.children;
      for (let i = 0; i < childElements.length; i++) {
        const childElement = childElements[i];
        if (this.columnFlexValues[i] !== undefined) {
          childElement.style.flex = this.columnFlexValues[i].toString();
        }
      }
    }
  }

  private resetColumnFlexValues(): void {
    const childElements = this.el.nativeElement.children;
    for (let i = 0; i < childElements.length; i++) {
      const childElement = childElements[i];
      childElement.style.flex = '1';
    }
  }
}
