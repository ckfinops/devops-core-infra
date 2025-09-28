import { Component } from '@angular/core';

@Component({
  selector: 'blogs',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogsComponent {
baseurl: string;
constructor() {
  this.baseurl= window.location.origin;
}
}

