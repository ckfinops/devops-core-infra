
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; // for template-driven forms
// or
import { ReactiveFormsModule } from '@angular/forms'; // for reactive forms

@Component({
  selector: 'registration-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterFormComponent {
  popupform = false;
  name = 'Angular';
  formData: { name: string, email: string, mobile: string } = { name: '', email: '', mobile: '' };

  // Reference to the hidden link element
  @ViewChild('pdfDownloadLink', { static: false })
  pdfDownloadLink!: ElementRef;

  // Function to handle the download and close
  handleDownloadAndClose() {
    // Trigger the download by simulating a click on the hidden link
    this.pdfDownloadLink.nativeElement.click();

    // Close the form
    this.popupform = false;
  }

  // Function to handle form submission
  handleSubmitForm() {
    if (this.formData.name && this.formData.email && this.formData.mobile) {
      this.handleDownloadAndClose(); // Download the PDF and close the form
    } else {
      alert('Please fill in all the form fields before submitting.');
    }
  }
}
