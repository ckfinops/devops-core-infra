import { Component } from '@angular/core';

@Component({
  selector: 'certificate',
  templateUrl: './certificate.component.html',
  styleUrls:['./certificate.component.css']

})
export class CertificateComponent { 
  certificateType: string = 'course'; // Set the default certificate type

  showCertificate(type: string): void {
    this.certificateType = type;
  }
}