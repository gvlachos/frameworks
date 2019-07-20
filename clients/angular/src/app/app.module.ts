import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardListComponent } from './card-list/card-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, CardComponent, CardDetailsComponent, CardListComponent, SidebarComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [Title],
  bootstrap: [AppComponent],
})
// testing pre-commit hook
export class AppModule {}
