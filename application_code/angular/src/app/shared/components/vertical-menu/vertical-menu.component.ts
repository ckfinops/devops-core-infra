import { Component } from '@angular/core';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.css']
})
export class VerticalMenuComponent {
  isMenuActive: boolean = false;

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  // toggleMenu() {
  //   var menuBar = document.getElementById('menuBar');
  //   this.menuBar.classList.toggle('active');
  // }
}
