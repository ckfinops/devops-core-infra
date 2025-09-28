import { Component } from '@angular/core';

@Component({
  selector: 'app-azure-certifcates',
  templateUrl: './azure-certifcates.component.html',
  styleUrls: ['./azure-certifcates.component.css']
})
export class AzureCertifcatesComponent {
  certificateType: string = 'course'; // Set the default certificate type

  showCertificate(type: string): void {
    this.certificateType = type;
  }
}
