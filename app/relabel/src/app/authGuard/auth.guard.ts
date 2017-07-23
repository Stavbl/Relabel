import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            var user = JSON.parse(localStorage.getItem('currentUser'));
            console.log("auth:"+ user.username);
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/landing'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}