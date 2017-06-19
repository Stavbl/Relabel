import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import {AuthenticationService } from '../services/Authentication.service';
import {AlertService } from '../services/alert.service';
import { User } from '../_models/user';


@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    objectData : User;
    private user : User;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                // function(response) { console.log("Success Response" + response)},
                // function(error) { console.log("Error happened" + error)},
                // function() { console.log("the subscription is completed")}

                data => {
                    console.log(data);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }
}
