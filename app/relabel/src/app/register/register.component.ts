import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { AlertService } from "../services/alert.service";
import { User } from "../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;
    user: User;
 
    constructor(
        private router: Router,
        private loginService: LoginService,
        private alertService: AlertService) { }
    ngOnInit(){}
 
    register() {
        this.loading = true;
        this.loginService.create(this.model.username,this.model.password)
            .then((usr) => {
                    if (usr && usr.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(usr));
                        this.user = JSON.parse(localStorage.getItem('currentUser'));
                        console.log(this.user.username);
                        this.loginService.currentUser.emit(this.user);
                        this.alertService.success('Registration successful');
                        this.router.navigate(['./getPref'])
                    }
                    else {
                      console.log("wrong user name or password");
                      this.alertService.error("wrong user name or password");
                    }
                  
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
