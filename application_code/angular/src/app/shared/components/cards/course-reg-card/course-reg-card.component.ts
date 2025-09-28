import { Component, Input } from '@angular/core';

@Component({
  selector: 'course-reg-card',
  templateUrl: './course-reg-card.component.html',
  styleUrls: ['course-reg-card.component.css']
})
export class CourseRegCardComponent {
  @Input() CourseLink: string = "aws-training-in-hyderabad.html";
  @Input() CourseLinkName: string = "AWS Course Training";
  @Input() ImgSrc: string = "https://www.digital-lync.com/images/aws-banner.jpg";
  @Input() CourseName: string = "AWS";
}
