import { Component, Input } from '@angular/core';

@Component({
  selector: 'simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent {
  @Input() ImgSrc: string = "https://www.digital-lync.com/images/student1.png";
  @Input() ImgTitle: string = "Learn From Cloud Binary Best Online Training";
  @Input() CardTitle: string = "Learn From Best";
  @Input() CardDesc: string = "We don’t settle or let you settle for nothing less than the BEST.";
}
