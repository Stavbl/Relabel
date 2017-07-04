import { Component, OnInit } from '@angular/core';
import {Routes,RouterModule, Router} from '@angular/router';
import { PrefService } from "../services/pref.service";
import {NgForm} from '@angular/forms';
import { Pref } from "../models/pref";
import { User } from "../models/user";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
    pref: Pref[];
    user: User;

  constructor(private prefservice: PrefService,
              public router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.prefservice.getPrefById(this.user._id).then((prf) => {
      this.pref = prf; 
    });
  }

  updatePref() {
    this.prefservice.setPrefById(this.user._id,this.pref).then((prf) => {
      this.pref = prf; 
      this.router.navigate(['./dashboard'])
    });
  }
}
