import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { customHttpProvider } from './_helper/custom-http';

import { AppComponent } from './app.component';
import { LoginAppComponent } from './login-app/login-app.component';
import {AuthenticationService } from './services/Authentication.service';
import {AlertService } from './services/alert.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './authGuard/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginAppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    customHttpProvider,
    AlertService,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
