import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authGuard/auth.guard';

const appRoutes: Routes =[
    { path: '', redirectTo: '/login', pathMatch:'full'},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'getPref', component: PreferencesComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}