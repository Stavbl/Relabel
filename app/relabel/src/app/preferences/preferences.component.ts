import { Component, OnInit } from '@angular/core';
import {Routes,RouterModule, Router} from '@angular/router';
import { PrefService } from "../services/pref.service";
import { MiniPlayerService } from "../services/mini-player.service";
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
    currentGenre: string = '';
    isPlaying: boolean = false;

  constructor(private prefservice: PrefService,
              private mps: MiniPlayerService,
              public router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.prefservice.getPrefById(this.user._id).then((prf) => {
      this.pref = prf; 
    });
    // this.mps.genreSelected.subscribe((genre) => {
    //   this.currentGenre = genre;
    //   console.log("current genre "+ genre);
    //   if (this.currentGenre == null) {
    //     this.mps.Stop();
    //     return; 
    //   }
    //   this.LoadUrl(genre);
    // });
  }

  updatePref() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.prefservice.setPrefById(this.user._id,this.pref).then((prf) => {
      this.pref = prf; 
      this.mps.Stop();
      this.router.navigate(['./dashboard'])
    });
  }

  // load(url) {
  //   this.mps.LoadUrl(url);
  //   this.play()
  // }
  // play() {
  //   this.mps.Play();
  //   this.isPlaying = true;
  // }
  // pause() {
  //   this.mps.Pause();
  //   this.isPlaying = false;
  // }
  // LoadUrl(genre:string) {
  //   console.log("load " + genre);
  //   switch(genre) {
  //     case 'detriot' :
  //       if(this.currentGenre != 'detriot') {
  //         console.log("loading detroit and playing");
  //         this.load('https://s3.amazonaws.com/relabel/Pan+Pot+-+Sleepless+(Stephan+Bodzin+Remix+)+%5B128BPM%5D.mp3');
  //         this.currentGenre = 'detriot'
  //       }
  //       else 
  //         this.play_pause();
  //       break;
  //     case 'hard' :
  //       if(this.currentGenre != 'hard') {
  //         console.log("loading hard and playing");
  //         this.load('https://s3.amazonaws.com/relabel/Emmanuel+Top+-+Acid+Phase.mp3');
  //         this.currentGenre = 'hard'
  //       }
  //       else 
  //         this.play_pause();
  //       break;
  //   }
  // }
  // play_pause() {
  //   if(this.isPlaying)  
  //     this.pause();
  //   else  
  //     this.play();
  // }
}
