import { Component, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-button-chooser',
  styleUrls: ['./button.component.css'],
  template: `
    <ng-container [ngSwitch]="buttonStyle">
      <!-- Basic Button -->
        <button *ngSwitchCase="'button1'" class="button button1" (click)="createRipples($event)">{{buttonName}}</button>
      <!-- Gradient Button -->
        <button  *ngSwitchCase="'button2'" class="button button2" (click)="createRipples($event)">{{buttonName}}</button>
      <!-- Rounded Button -->
        <button  *ngSwitchCase="'button3'" class="button button3" (click)="createRipples($event)">{{buttonName}}</button>
      <!-- Outline Button -->
        <button  *ngSwitchCase="'button4'" class="button button4" (click)="createRipples($event)">{{buttonName}}</button>
      <!-- OutlineButtonImg -->
        <button  *ngSwitchCase="'OutlineButtonImg'" class="button OutlineButtonImg" (click)="createRipples($event)">
          <img [src]="iconPath" class="play-btn" height="24px" width="24px" alt="play button" >
        {{buttonName}}</button>
        <!-- Icon Button -->
          <button  *ngSwitchCase="'button5'" class="button button5" (click)="createRipples($event)"><i class="fas fa-heart"></i>{{buttonName}}</button>
      <!-- Animated Button -->
        <button  *ngSwitchCase="'button6'" class="button button6" (click)="createRipples($event)">{{buttonName}}</button>
      <!-- Hower effect with box-shadow -->
        <button *ngSwitchCase="'button7'" class="button button7">{{buttonName}}</button>
      <!-- hower effect two gradient background colors -->
        <a href="" *ngSwitchCase="'button8'" class="button8">{{buttonName}}</a>
      <!-- hower effect with two colors colliding -->
        <button href="" *ngSwitchCase="'button9'" class="button9">{{buttonName}}</button>
      <!-- border-animation -->
        <a href="" *ngSwitchCase="'button10'" class="button button10">{{buttonName}}</a>
      <!-- https://www.geekboots.com/css/button-with-liquid-filling-effect -->
        <a href="" *ngSwitchCase="'button11'" class="button button11"><span>{{buttonName}}</span></a>
      <!-- https://www.geekboots.com/css/animated-button-border -->
        <a href="" *ngSwitchCase="'button12'" class="button12" ><span>{{buttonName}}</span></a>
      <div *ngSwitchDefault>Invalid button style input</div>
    </ng-container>
  `,
})
export class ButtonChooserComponent {
  @Input() buttonStyle: string = "button1";
  @Input() buttonName: string = "Click Me";
  @Input() iconPath: string = "../assets/icon-images/play-icon.webp";

  constructor(private renderer: Renderer2) { }

  createRipples(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    const pos = button.getBoundingClientRect();
    const x = event.clientX - pos.left - size / 2;
    const y = event.clientY - pos.top - size / 2;

    const rippleOuter = this.renderer.createElement('span');
    this.renderer.setStyle(rippleOuter, 'width', `${size}px`);
    this.renderer.setStyle(rippleOuter, 'height', `${size}px`);
    this.renderer.setStyle(rippleOuter, 'left', `${x}px`);
    this.renderer.setStyle(rippleOuter, 'top', `${y}px`);
    this.renderer.addClass(rippleOuter, 'ripple');
    this.renderer.addClass(rippleOuter, 'ripple-outer');
    this.renderer.appendChild(button, rippleOuter);

    const rippleInner = this.renderer.createElement('span');
    this.renderer.setStyle(rippleInner, 'width', `${size}px`);
    this.renderer.setStyle(rippleInner, 'height', `${size}px`);
    this.renderer.setStyle(rippleInner, 'left', `${x}px`);
    this.renderer.setStyle(rippleInner, 'top', `${y}px`);
    this.renderer.addClass(rippleInner, 'ripple');
    this.renderer.appendChild(button, rippleInner);

    setTimeout(() => {
      this.renderer.removeChild(button, rippleOuter);
      this.renderer.removeChild(button, rippleInner);
    }, 600000);
  }
}
