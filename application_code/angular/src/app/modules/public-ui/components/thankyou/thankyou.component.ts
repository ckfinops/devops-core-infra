import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css'] 
})
export class ThankyouComponent {
  constructor(private router: Router) { }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  
}
