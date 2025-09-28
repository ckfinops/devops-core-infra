import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'key-features',
  templateUrl: './key-features.component.html',
  styleUrls:['./key-features.component.css']
})
export class KeyFeaturesComponent {
  isScreenSmall = window.innerWidth <= 720;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isScreenSmall = event.target.innerWidth <= 720;
    console.log("isScreenSmall===>",event.target.innerWidth)
  }

  sidenavOpen = false;

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }


  
}
