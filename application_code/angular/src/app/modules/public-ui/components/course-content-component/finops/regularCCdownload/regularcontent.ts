import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
@Component({
  selector: 'app-regularCCdownloadform',
  templateUrl: './regularcontent.html',
  styleUrls: ['./regularcontent.css']
})
export class RegulardownloadformComponent {
  loading = false;

  // registrationForm!: FormGroup
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

  constructor(public dialogRef: MatDialogRef<RegulardownloadformComponent>,private elementRef: ElementRef,private snackBar: MatSnackBar,private http: HttpClient, private dataService: DataService , private router: Router) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.loading = true;
    //disable submit button
    this.elementRef.nativeElement.querySelector('button').setAttribute('disabled', true);
    if (this.registrationForm.valid) {

      // console.log(this.registrationForm.value);
      // Insert form data into API
      this.dataService.submitForm(this.registrationForm.value).subscribe((res: any) => {
        console.log(res);
        this.http.get('https://8amcloudbinary.s3.amazonaws.com/AWS_DevOps_Regular_CloudBinary_20240125.pdf', { responseType: 'blob' })
        .subscribe((response: Blob) => {
          saveAs(response, 'CB DevOps CourseCurriculum.pdf');
          this.loading = false;
          // Show success message
          this.snackBar.open('Form submitted successfully!', 'Close', {
            duration: 5000
          });
          });
        this.dialogRef.close();
        this.router.navigate(['/thank-you']);
      });

    }
  }

}
