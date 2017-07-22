import { Component, OnInit, Input } from '@angular/core';
import { PrefService } from "../../services/pref.service";
import { Pref } from "../../models/pref";
import { User } from "../../models/user";

@Component({
  selector: 'pref',
  templateUrl: './pref.component.html',
  styleUrls: ['./pref.component.css']
})
export class PrefComponent implements OnInit {
  @Input() prf: Pref;
  user: User
  fullbar = document.getElementById("fullbar");
  num = null;

  constructor(private prefservice: PrefService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // this.prefservice.getPrefById(this.user._id).then((p) => {
    //   this.prf = p; 
    // });
  }

  barMouseMove(event) {
    var width = event.currentTarget.clientWidth;
    var offset = event.clientX;
    var pageX = event.currentTarget.getBoundingClientRect().left;
    var dx = pageX- event.currentTarget.scrollLeft;
    this.num = Math.floor(((offset- dx)/width)*10) + 1
  }
  barMouseOut() {
    this.num = null;
  }
  barMouseClick() {
    this.prf.value = this.num;
  }

  getCurrentNumber() {
    if (this.num != null) { 
      return this.num;
    } else {
      return this.prf.value;
      }
  }
}