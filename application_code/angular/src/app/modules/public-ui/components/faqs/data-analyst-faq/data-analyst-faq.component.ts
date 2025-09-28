import { Component, ElementRef, AfterViewInit, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'app-data-analyst-faq',
  templateUrl: './data-analyst-faq.component.html',
  styleUrls: ['../faq.component.css']
})
export class DataAnalystFaqComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    const faqQuestions = this.el.nativeElement.querySelectorAll('.faq-question');

    faqQuestions.forEach((question: { parentNode: any; }) => {
      this.renderer.listen(question, 'click', () => {
        const faqItem = question.parentNode;
        faqItem.classList.toggle('active');
      });
    });
  }
}