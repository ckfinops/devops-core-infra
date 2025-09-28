import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-deveopsdownloadform',
  templateUrl: './deveopsdownloadform.component.html',
  styleUrls: ['./deveopsdownloadform.component.css']
})
export class DeveopsdownloadformComponent {
  loading = false;

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]);
  experience = new FormControl('', [Validators.required]);
  courseInterest = new FormControl('', [Validators.required]);

  registrationForm = new FormGroup({
    name: this.name,
    email: this.email,
    phone: this.phone,
    experience: this.experience,
    courseInterest: this.courseInterest,
  });

  constructor(
    public dialogRef: MatDialogRef<DeveopsdownloadformComponent>,
    private elementRef: ElementRef,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private dataService: DataService,
    private router: Router
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.loading = true;
    // disable submit button
    this.elementRef.nativeElement.querySelector('button').setAttribute('disabled', true);
  
    if (this.registrationForm.valid) {
      // Insert form data into API
      this.dataService.submitForm(this.registrationForm.value).subscribe((res: any) => {
        console.log(res);
  
        // Get the selected course interest
        const selectedCourseInterest = this.registrationForm.get('courseInterest')?.value;
  
        // Define the default URL for cases where selectedCourseInterest is not 'Job Ready' or 'Regular'
        let pdfUrl: string = '';
  
        // Assign URLs based on the course interest
        if (selectedCourseInterest === 'Job Ready') {
          pdfUrl = 'https://8amcloudbinary.s3.amazonaws.com/Job_Ready_With_Internship_Program_CloudBinary_20240228.pdf'; // Replace with the actual URL for Job Ready PDF
        } else if (selectedCourseInterest === 'Regular') {
          pdfUrl = 'https://8amcloudbinary.s3.amazonaws.com/AWS_DevOps_Regular_20240225_20240228.pdf'; // Replace with the actual URL for Regular PDF
        }
  
        // Download the selected PDF
        this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((response: Blob) => {
          const fileName = selectedCourseInterest === 'Job Ready' ? 'JobReadyCourse.pdf' : 'RegularCourse.pdf';
          saveAs(response, fileName);
  
          // Reset loading state and show success message
          this.loading = false;
          this.snackBar.open('Form submitted successfully!', 'Close', {
            duration: 5000
          });
  
          // Close the dialog and navigate to the thank-you page
          this.dialogRef.close();
          this.router.navigate(['/thank-you']);
        });
      });
    }
  }
}  