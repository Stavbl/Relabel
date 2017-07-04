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
import { TrackService } from "./services/track.service";
import { PrefService } from "./services/pref.service";
import { LoginService } from "./services/login.service";
import { PlaylistService } from "./services/playlist.service";
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './authGuard/auth.guard';
import { AppDropdownDirective } from './directives/app-dropdown.directive';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PreferencesComponent,
    HeaderComponent,
    LoginComponent,
    AppDropdownDirective
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
    LoginService,
    PlaylistService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
