import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Added imports
import {RouterModule } from '@angular/router';
import { TrackService } from "app/track.service";
import { PrefService } from "./preferences/pref.service";
import { PreferencesComponent } from './preferences/preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PreferencesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      [
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'getPref',
          component: PreferencesComponent
        }
      ]
    )
  ],
  providers: [
    TrackService,
    PrefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
