import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'devopsdownload-form',
  templateUrl: './devops.download.component.html',
  styleUrls: ['./devops.download.component.css']
})
export class DevopsDownloadComponent {
  popupform = false;
  name = 'Angular';
  formData: { name: string; email: string; phone: string } = { name: '', email: '', phone: '' };

  // Reference to the hidden link element
  @ViewChild('pdfDownloadLink', { static: false })
  pdfDownloadLink!: ElementRef;

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private dataService: DataService,
    private router: Router
  ) {}

  // Function to handle the download and close
  handleDownloadAndClose() {
    // Insert form data into API
    this.dataService.submitForm(this.formData).subscribe((res: any) => {
      // Download the first PDF
      this.http
        .get('https://8amcloudbinary.s3.amazonaws.com/AWS_DevOps_Regular_CloudBinary_20240125.pdf', {
          responseType: 'blob'
        })
        .subscribe((response: Blob) => {
          saveAs(response, 'CB DevOps CourseCurriculum.pdf');
        });

      // Download the second PDF
      this.http
        .get('https://8amcloudbinary.s3.amazonaws.com/AWS_DevOps_Regular_CloudBinary_20240125.pdf', { responseType: 'blob' })
        .subscribe((response: Blob) => {
          saveAs(response, 'Additional_CloudBinary.pdf');
        });

      // Show success message
      this.snackBar.open('Form submitted successfully!', 'Close', {
        duration: 5000
      });

      // Close the form
      this.popupform = false;
      this.router.navigate(['/thank-you']);
    });
  }

  // Function to handle form submission
  handleSubmitForm() {
    if (this.formData.name && this.formData.email && this.formData.phone) {
      this.handleDownloadAndClose(); // Download the PDFs and close the form
    } else {
      alert('Please fill in all the form fields before submitting.');
    }
  }
}
