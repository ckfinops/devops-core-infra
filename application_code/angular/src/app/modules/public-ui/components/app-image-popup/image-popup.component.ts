import { Component } from '@angular/core';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css']
})
export class ImagePopupComponent {
  public isPopupOpen: boolean = true;

  closePopup() {
    this.isPopupOpen = false;
  }
}
