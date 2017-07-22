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
import { AlertService } from "./services/alert.service";
import { PrefService } from "./services/pref.service";
import { LoginService } from "./services/login.service";
import { PlaylistService } from "./services/playlist.service";
import { PlayerService } from "./services/player.service";
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './authGuard/auth.guard';
import { AppDropdownDirective } from './directives/app-dropdown.directive';
import { PlaylistComponent } from './playlist/playlist.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MiniPlayerComponent } from './mini-player/mini-player.component';
import { MiniPlayerService } from "app/services/mini-player.service";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { AlertsComponent } from './alerts/alerts.component';
import { PlaylistPlayerComponent } from './playlist-player/playlist-player.component';
import { PlaylistPlayerService } from "./services/playlist-player.service";
import { PrefComponent } from './preferences/pref/pref.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PreferencesComponent,
    HeaderComponent,
    LoginComponent,
    AppDropdownDirective,
    PlaylistComponent,
    MainMenuComponent,
    MiniPlayerComponent,
    AlertsComponent,
    PlaylistPlayerComponent,
    PrefComponent,
    LandingPageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    Ng2AutoCompleteModule
  ],
  providers: [
    TrackService,
    PrefService,
    AlertService,
    LoginService,
    PlaylistService,
    PlaylistPlayerService,
    PlayerService,
    MiniPlayerService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
