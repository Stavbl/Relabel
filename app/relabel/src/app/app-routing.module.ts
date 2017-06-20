import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes =[
    { path: '', redirectTo: '/dashboard', pathMatch:'full'},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'getPref', component: PreferencesComponent},
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}