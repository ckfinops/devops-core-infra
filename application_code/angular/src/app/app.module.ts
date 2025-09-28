import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicUiModule } from './modules/public-ui/public-ui.modue';
import { SharedModule } from './shared/shared-mod.module';
import 'bootstrap';
import { FooterComponent } from './components/footer-col/footer-col.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    PublicUiModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
