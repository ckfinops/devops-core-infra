import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'contactus',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactUsComponent {
  formData: { first_name: string, last_name: string, email: string, phone: string, user_message: string } = { first_name: '', last_name: '', email: '', phone: '', user_message: '' };
  isLoading = false; // Loading state for spinner

  constructor(
    private snackBar: MatSnackBar
  ) { }

  // Function to handle the form submission, reset, and redirect to WhatsApp
  handleFormSubmissionResetAndRedirect() {
    // Construct the WhatsApp message
    const message = `Hi, I have visited your website and I am excited to know about AWS & DevOps Course Details. Could you please help me?\nName: ${this.formData.first_name} ${this.formData.last_name}\nPhone: ${this.formData.phone}\nMessage: ${this.formData.user_message}`;
    
    // WhatsApp URL for web and app compatibility
    const whatsappURL = `https://wa.me/919100073006?text=${encodeURIComponent(message)}`;

    // Show success message
    this.snackBar.open('Redirecting to WhatsApp...', 'Close', {
      duration: 5000
    });

    // Reset the form
    this.resetForm();

    // Redirect to WhatsApp (both web and app will work)
    window.location.href = whatsappURL;
  }

  // Function to handle form submission
  handleSubmitForm() {
    if (this.formData.first_name && this.formData.last_name && this.formData.email && this.formData.phone && this.formData.user_message) {
      // Start loading spinner
      this.isLoading = true;

      this.handleFormSubmissionResetAndRedirect(); // Submit the form, reset, and redirect to WhatsApp
    } else {
      alert('Please fill in all the form fields before submitting.');
    }
  }

  // Function to reset the form
  resetForm() {
    this.formData = { first_name: '', last_name: '', email: '', phone: '', user_message: '' };
    this.isLoading = false; // Stop loading spinner
  }
}
