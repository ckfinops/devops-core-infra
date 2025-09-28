import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonChooserComponent } from './components/buttons/button.component';
import { CardWrapperComponent } from './components/card-wrapper/card-wrapper.component';
import { HoverLinkImageComponent } from './components/hover-link-image/hover-link-image.component';
import { VerticalMenuComponent } from './components/vertical-menu/vertical-menu.component';
import { VerticalMenuComponent2 } from './components/vertical-menu-app/vertical-menu.component';

import { SetChildStyleDirective } from './directives/boxes/set-child-style.directive';
import { ImgBlockDirective } from './directives/boxes/img-block/img-block.directive';
import { RowColFlexboxDirective } from './directives/boxes/row-col-flex/rowcol-flexbox.directive';
import { VerticalMenuComponent3 } from './components/vertical-menu-app-2/vertical-menu.component';
import { SimpleCardComponent } from './components/cards/simple-card/simple-card.component';
import { CourseRegCardComponent } from './components/cards/course-reg-card/course-reg-card.component';



@NgModule({
  declarations: [CardWrapperComponent, ButtonChooserComponent, RowColFlexboxDirective, ImgBlockDirective, SetChildStyleDirective, HoverLinkImageComponent, VerticalMenuComponent,
    VerticalMenuComponent2, VerticalMenuComponent3, SimpleCardComponent, CourseRegCardComponent],
  exports: [CardWrapperComponent, ButtonChooserComponent, RowColFlexboxDirective, ImgBlockDirective, SetChildStyleDirective, HoverLinkImageComponent, VerticalMenuComponent,
    VerticalMenuComponent2, VerticalMenuComponent3, SimpleCardComponent, CourseRegCardComponent],
  imports: [CommonModule]
})
export class SharedModule { }
