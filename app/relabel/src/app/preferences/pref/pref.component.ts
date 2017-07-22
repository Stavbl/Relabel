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

  // var b1 = document.getElementById("b1");
  // var b2 = document.getElementById("b2");
  // var b3 = document.getElementById("b3");
  // var b4 = document.getElementById("b4");
  // var b5 = document.getElementById("b5");
  // var b6 = document.getElementById("b6");
  // var b7 = document.getElementById("b7");
  // var b8 = document.getElementById("b8");
  // var b9 = document.getElementById("b9");
  // var b10 = document.getElementById("b10");

  // updateBars(num) {
  //   if (num > 0) {
  //     b1.className += " selected"
  //   } else {
  //     b1.className = "bar"
  //   }
  //   if (num > 1) {
  //     b2.className += " selected"
  //   } else {
  //     b2.className = "bar"
  //   }
  //   if (num > 2) {
  //     b3.className += " selected"
  //   } else {
  //     b3.className = "bar"
  //   }
  //   if (num > 3) {
  //     b4.className += " selected"
  //   } else {
  //     b4.className = "bar"
  //   }
  //   if (num > 4) {
  //     b5.className += " selected"
  //   } else {
  //     b5.className = "bar"
  //   }
    
  //   if (num > 5) {
  //     b6.className += " selected"
  //   } else {
  //     b6.className = "bar"
  //   }
  //   if (num > 6) {
  //     b7.className += " selected"
  //   }  else {
  //     b7.className = "bar"
  //   }
  //   if (num > 7) {
  //     b8.className += " selected"
  //   } else {
  //     b8.className = "bar"
  //   }
  //   if (num > 8) {
  //     b9.className += " selected"
  //   } else {
  //     b9.className = "bar"
  //   }
  //   if (num > 9) {
  //     b10.className += " selected"
  //   } else {
  //     b10.className = "bar"
  //   }
  // }

    getCurrentNumber() {
      if (this.num != null) { 
        return this.num;
      } else {
        return this.prf.value;
       }
    }
}