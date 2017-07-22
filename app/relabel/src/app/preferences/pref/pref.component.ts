import { Component, OnInit, Input } from '@angular/core';
import { PrefService } from "../../services/pref.service";
import { Pref } from "../../models/pref";
import { User } from "../../models/user";
import { MiniPlayerService } from "../../services/mini-player.service";
import { Track } from '../../models/track';

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
  currentTrack: Track = null;
  playing:boolean = false;

  constructor(private prefservice: PrefService, private mps:MiniPlayerService) { }

  ngOnInit() {
    // this.mps.itemSelected.subscribe((url) => {
    //   this.currentTrack = url;
    //   if (this.currentTrack == null) {
    //     this.mps.Stop();
    //     return; 
    //   }
    //   this.mps.LoadUrl(url);
    //   this.play(url);
    // })
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
  // play(url) {
  //   this.mps.LoadUrl(url);
  //   this.mps.Play();
  //   this.playing = true;
  // }
  // pause() {
  //   this.mps.Pause();
  // }
  // LoadUrl(genre:string) {
  //   switch(genre) {
  //     case 'detriot' :
  //       this.play('https://s3.amazonaws.com/relabel/Pan+Pot+-+Sleepless+(Stephan+Bodzin+Remix+)+%5B128BPM%5D.mp3');
  //       break;
  //     case 'hard' :
  //       break;
  //   }
  // }
}