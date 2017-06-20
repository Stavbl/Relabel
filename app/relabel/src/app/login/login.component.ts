import { Component, OnInit } from '@angular/core';
import {Routes,RouterModule, Router} from '@angular/router';
import { LoginService } from "./login.service";
import {NgForm} from '@angular/forms';
import { User } from "./user";

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
  }
  login(form:NgForm){
      const val = form.value;
      console.log(val);   
      this.loginservice.login(val.username,val.password).then((usr) => {
          console.log(usr);
      this.user = usr; 
      console.log(this.user.username);
      this.router.navigate(['./dashboard'])
    }); 
  }

}
