import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'subhead',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css'] 
})
export class SubHeaderComponent implements OnInit {
    countdown!: string;

    constructor() { }
  
    ngOnInit(): void {
      this.initializeCountdown();
    }
  
    private initializeCountdown() {
      // Set the date we're counting down to
      const countDownDate = new Date().getTime() + 10 * 24 * 60 * 60 * 1000; // 10 days from now
  
      // Update the countdown every 1 second
      const x = setInterval(() => {
        // Get the current date and time
        const now = new Date().getTime();
  
        // Calculate the remaining time
        const distance = countDownDate - now;
  
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        // Display the countdown
        this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  
        // If the countdown is over, display a message
        if (distance < 0) {
          clearInterval(x);
          this.countdown = 'Offer Expired';
        }
      }, 1000);
    }
  }