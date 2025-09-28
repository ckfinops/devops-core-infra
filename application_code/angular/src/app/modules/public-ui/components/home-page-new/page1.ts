import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'home-page-new',
  templateUrl: './page1.html',
  styleUrls: ['./page1.css']
})
export class HomePageNewComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      option: ['', Validators.required] // Added Validators.required for the 'option' field
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const name = this.myForm.get('name')!.value;
      const phone = this.myForm.get('phone')!.value;
      const option = this.myForm.get('option')!.value;

      const message = `Hi, I have visited your website and I am excited to know about ${option} Course Details. Could you please help me?\nName: ${name}\nPhone: ${phone}\nLooking for: ${option}`;
      const whatsappURL = `https://api.whatsapp.com/send/?phone=919100073006&text=${encodeURIComponent(message)}`;



      window.location.href = whatsappURL;

      this.myForm.reset(); // Reset the form after submission
    } else {
      console.error('Form is not valid. Please check the fields.');

      Object.keys(this.myForm.controls).forEach(key => {
        const control = this.myForm.get(key)!;
        console.log(`Control '${key}':`);
        console.log('  Status:', control.status);
        console.log('  Errors:', control.errors);
      });
    }
  }
}
