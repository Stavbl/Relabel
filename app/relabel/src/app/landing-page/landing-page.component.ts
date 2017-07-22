import { Component, OnInit } from '@angular/core';
import {Routes,RouterModule, Router} from '@angular/router';
import { LoginService } from "../services/login.service";

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private loginservice: LoginService,
              public router: Router) { }

  ngOnInit() {
    this.loginservice.logout();
  }

}
