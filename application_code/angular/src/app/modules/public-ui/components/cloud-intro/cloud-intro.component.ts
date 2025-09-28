import { Component } from '@angular/core';

@Component({
  selector: 'cloud-intro-comp',
  templateUrl: './cloud-intro.component.html',
  styleUrls: ['./cloud-intro.component.css', '../../../../shared/directives/boxes/row-col-flex/rowcol-flexbox.directive.css']
})
export class CloudIntroComponent {
  abc() {
    throw new Error('Method not implemented.');
  }
  title = 'cloudbinary';
}
