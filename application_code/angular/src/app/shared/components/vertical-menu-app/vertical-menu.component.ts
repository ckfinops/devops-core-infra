import { Component } from '@angular/core';

@Component({
  selector: 'app-vertical-menu2',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.css']
})
export class VerticalMenuComponent2 {
  activeSubMenu: string | null = null;
  clickedMenu: string | null = 'Home';
  expandMenu: boolean = false;


  toggleMenu() {
    if (this.activeSubMenu == null) {
      this.activeSubMenu = this.clickedMenu;
    } else {
      this.activeSubMenu = null;
    }
    this.expandMenu = !this.expandMenu;
  }

  showSubMenu(subMenuId: string) {
    this.activeSubMenu = subMenuId;
  }

  menuClick(menuId: string) {
    if (this.clickedMenu != menuId) {
      this.clickedMenu = menuId;
    }
    this.activeSubMenu = menuId;
  }

  hideSubMenu(subMenuId: string, event: MouseEvent, subMenu?: boolean) {
    let isHovered: boolean;
    if (subMenu) {
      isHovered = false;
    }
    else
      isHovered = this.isHovered(subMenuId, event);
    if (!isHovered) {
      if (this.clickedMenu == null || this.expandMenu == false) {
        this.activeSubMenu = null;
      } else {
        this.activeSubMenu = this.clickedMenu;
      }
    }
  }


  isHovered(subMenuId: string, event: MouseEvent): boolean {
    const menuElements = document.getElementsByClassName(subMenuId);
    for (let i = 0; i < menuElements.length; i++) {
      const menuElement = menuElements[i] as HTMLElement;
      const rect = menuElement.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      if (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
      ) {
        return true;
      }
    }
    return false;
  }
}
