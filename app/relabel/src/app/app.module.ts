import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

// Added imports
import {RouterModule } from '@angular/router';
import { TrackService } from "app/track.service";
import { PrefService } from "./preferences/pref.service";
import { LoginService } from "./login/login.service";
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PreferencesComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    TrackService,
    PrefService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
