import { Component } from '@angular/core';

@Component({
  selector: 'app-da-certifcates',
  templateUrl: './da-certifcates.component.html',
  styleUrls: ['./da-certifcates.component.css']
})
export class DaCertifcatesComponent {
  certificateType: string = 'course'; // Set the default certificate type

  showCertificate(type: string): void {
    this.certificateType = type;
  }
}
