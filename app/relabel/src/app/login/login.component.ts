import { Component, OnInit } from '@angular/core';
import {Routes,RouterModule, Router} from '@angular/router';
import { LoginService } from "../services/login.service";
import { AlertService } from "../services/alert.service";
import {NgForm} from '@angular/forms';
import { User } from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: User;
    model: any = {};
    username: string = '';
    password: string = '';
    notValid: boolean = false;

  constructor(private loginservice: LoginService,
              public router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
      this.loginservice.logout();
  }
  login(form:NgForm){
    const val = form.value;   
    this.loginservice.login(val.username,val.password).then((usr) => {
      if (usr && usr.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(usr));
          this.user = JSON.parse(localStorage.getItem('currentUser'));
          console.log(this.user.username);
          this.loginservice.currentUser.emit(this.user);
          this.router.navigate(['./dashboard'])
          }
      else{
        console.log("wrong user name or password");
        this.alertService.error("wrong user name or password");
      }
    }); 
  }
}
