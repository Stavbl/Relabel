import { Component, OnInit } from '@angular/core';
import {Routes,RouterModule, Router} from '@angular/router';
import { PrefService } from "./pref.service";
import {NgForm} from '@angular/forms';
import { Pref } from "./pref";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
    pref: Pref[];
    newPrefs: Pref[] = [];

  constructor(private prefservice: PrefService,
              public router: Router) { }

  ngOnInit() {
    this.prefservice.getPrefById("Tale of Us").then((prf) => {
      this.pref = prf; 
    });
  }
  setPref(form:NgForm){
      const val = form.value;
      console.log(val);
      const detriot = 
          new Pref("detriot", val.detriot);
      this.newPrefs.push(detriot);   
      const hard = 
          new Pref("hard", val.hard);
      this.newPrefs.push(hard);
      const dance = 
          new Pref("dance", val.dance);
      this.newPrefs.push(dance);
      const minimal = 
          new Pref("minimal", val.minimal);
      this.newPrefs.push(minimal);
      const classic = 
          new Pref("classic", val.classic);
      this.newPrefs.push(classic);
      const house = 
          new Pref("house", val.house);
      this.newPrefs.push(house);
      const vgm = 
          new Pref("vgm", val.vgm);
      this.newPrefs.push(vgm);
      const hard_acid = 
          new Pref("hard_acid", val.hard_acid);
      this.newPrefs.push(hard_acid);
      const electro = 
          new Pref("electro", val.electro);
      this.newPrefs.push(electro); 
      console.log(JSON.stringify(this.newPrefs)); 
      this.updatePref() 
  }
  updatePref() {
    this.prefservice.setPrefById("Tale of Us",this.newPrefs).then((prf) => {
      this.pref = prf; 
      this.router.navigate(['./dashboard'])
    });
  }
}
