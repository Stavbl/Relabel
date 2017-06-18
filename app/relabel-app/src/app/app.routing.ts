import { Routes, RouterModule } from '@angular/router';
 
// import { HomeComponent } from './home/index';
import { LoginAppComponent } from './login-app/login-app.component';
// import { RegisterComponent } from './register/index';
// import { AuthGuard } from './_guards/index';
 
const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginAppComponent },
    // { path: 'register', component: RegisterComponent },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);