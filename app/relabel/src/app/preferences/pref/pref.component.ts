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
  playing:string = '';
  isPlaying = false;

  constructor(private prefservice: PrefService, private mps:MiniPlayerService) { }

  ngOnInit() {
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
  load(url) {
    this.mps.LoadUrl(url);
    this.play()
  }
  play() {
    this.mps.Play();
    this.isPlaying = true;
  }
  pause() {
    this.mps.Pause();
    this.isPlaying = false;
  }
  LoadUrl(genre:string) {
    console.log("load " + genre);
    switch(genre) {
      case 'detriot' :
        if(this.playing != 'detriot') {
          console.log("loading detroit and playing");
          this.load('https://s3.amazonaws.com/relabel/Pan+Pot+-+Sleepless+(Stephan+Bodzin+Remix+)+%5B128BPM%5D.mp3');
          this.playing = 'detriot'
        }
        else 
          this.play_pause();
        break;
      case 'hard' :
        if(this.playing != 'hard') {
          console.log("loading hard and playing");
          this.load('https://s3.amazonaws.com/relabel/Emmanuel+Top+-+Acid+Phase.mp3');
          this.playing = 'hard'
        }
        else 
          this.play_pause();
        break;
    }
  }
  play_pause() {
    if(this.isPlaying)  
      this.pause();
    else  
      this.play();
  }
  // onSelected(genre) {
  //   this.mps.genreSelected.emit(genre);
  //   // this.pps.pause();
  // }
}