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
      case 'dance' :
        if(this.playing != 'dance') {
          console.log("loading dance and playing");
          this.load('https://s3.amazonaws.com/relabel/CArl+Cox+-+Jaguar.mp3');
          this.playing = 'dance'
        }
        else 
          this.play_pause();
        break;
      case 'minimal' :
        if(this.playing != 'minimal') {
          console.log("loading minimal and playing");
          this.load('https://s3.amazonaws.com/relabel/Tale+Of+Us+-+Lost+City.mp3');
          this.playing = 'minimal'
        }
        else 
          this.play_pause();
        break;
      case 'classic' :
        if(this.playing != 'classic') {
          console.log("loading classic and playing");
          this.load('https://s3.amazonaws.com/relabel/Foals+-+Late+Night+(Solomun+Remix).mp3');
          this.playing = 'classic'
        }
        else 
          this.play_pause();
        break;
      case 'electro' :
        if(this.playing != 'electro') {
          console.log("loading electro and playing");
          this.load('https://s3.amazonaws.com/relabel/Maceo+Plex+-+Solar+Detroit+%5BELL029%5D.mp3');
          this.playing = 'electro'
        }
        else 
          this.play_pause();
        break;
      case 'house' :
        if(this.playing != 'house') {
          console.log("loading house and playing");
          this.load('https://s3.amazonaws.com/relabel/Tale+Of+Us+-+North+Star.mp3');
          this.playing = 'house'
        }
        else 
          this.play_pause();
        break;
      case 'vgm' :
        if(this.playing != 'vgm') {
          console.log("loading vgm and playing");
          this.load('https://s3.amazonaws.com/relabel/Pan-Pot+-+Fugitives+(Joseph+Capriati+Remix).mp3');
          this.playing = 'vgm'
        }
        else 
          this.play_pause();
        break;
      case 'hard_acid' :
        if(this.playing != 'hard_acid') {
          console.log("loading hard_acid and playing");
          this.load('https://s3.amazonaws.com/relabel/Emmanuel+Top+-+Turkish+Bazar.mp3');
          this.playing = 'hard_acid'
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