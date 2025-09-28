import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['intro-page.component.css']
})
export class IntroPageComponent {
  public isPopupOpen: boolean = true; // Start with popup open initially
  private hasScrolled: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (!this.hasScrolled) {
      this.hasScrolled = true; // Mark that the user has scrolled once
      this.isPopupOpen = false; // Close the popup after the first scroll
    }
  }
}
