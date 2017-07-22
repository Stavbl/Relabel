import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { LoginComponent } from './login/login.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AuthGuard } from './authGuard/auth.guard';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes =[
    { path: '', redirectTo: '/landing', pathMatch:'full'},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'getPref', component: PreferencesComponent, canActivate: [AuthGuard]},
    { path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'landing', component: LandingPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}