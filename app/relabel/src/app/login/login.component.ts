import { Component, OnInit } from '@angular/core';
import {Routes,RouterModule, Router} from '@angular/router';
import { LoginService } from "../services/login.service";
import {NgForm} from '@angular/forms';
import { User } from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: User;

  constructor(private loginservice: LoginService,
              public router: Router) { }

  ngOnInit() {
      this.loginservice.logout();
  }
  login(form:NgForm){
      const val = form.value;
      console.log(val);   
      this.loginservice.login(val.username,val.password).then((usr) => {
       if (usr && usr.token) {
            console.log("inside");
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(usr));
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            console.log(this.user.username);
            }
      this.router.navigate(['./dashboard'])
    }); 
  }

}
