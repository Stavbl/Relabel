import { Injectable, EventEmitter } from '@angular/core';
import { Track } from '../models/track';


@Injectable()
export class MiniPlayerService {
  itemSelected = new EventEmitter<Track>();
  audio = new Audio();
  constructor() { }

  Load(track:Track) {
    this.audio.src = track.url;
    this.audio.load();
  }
  getCurrentTime() {
    return this.audio.currentTime;
  }
  Play() {
    this.audio.play();
  }
  Stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
  Pause() {
    this.audio.pause();
  }
  LoadUrl(url:string) {
    this.audio.src = url;
    this.audio.load();
  }
}
