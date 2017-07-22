import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { LoginService } from "../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
      this.loginService.currentUser.subscribe(
         (user:User)=>{
           this.currentUser = user;
         }
     );
  }

}
