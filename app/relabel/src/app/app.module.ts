import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Added imports
import {RouterModule } from '@angular/router';
import { TrackService } from "app/track.service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      [
        {
          path: 'dashboard',
          component: DashboardComponent
        }
      ]
    )
  ],
  providers: [
    TrackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
