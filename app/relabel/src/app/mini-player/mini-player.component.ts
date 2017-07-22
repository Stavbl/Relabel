import { Component, OnInit } from '@angular/core';
import { MiniPlayerService } from "../services/mini-player.service";
import { Track } from '../models/track';

@Component({
  selector: 'mini-player',
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.css']
})
export class MiniPlayerComponent implements OnInit {
  currentTrack: Track = null;
  timeInterval = null;
  timeStr = '00:00';
  constructor(private mps:MiniPlayerService ) { }

  ngOnInit() {
    this.mps.itemSelected.subscribe((track) => {
    
      this.currentTrack = track;
      if (this.currentTrack == null) {
        this.mps.Stop();
        return; 
      }
      this.mps.Load(track);
      this.play();
    })
  }

  startTimer() {
    this.stopTimer();
    this.timeInterval = setInterval(()=>{
      this.updateTime();
    }, 300);
  }

  updateTime() {
    var duration = this.mps.getCurrentTime();
    var minutes = ('0' + Math.floor(duration/60)).substr(-2);
    var seconds = ('0' + Math.floor(duration%60)).substr(-2);
    this.timeStr = minutes + ':' + seconds;
  }

  stopTimer() {
     if (this.timeInterval != null) {
      clearInterval(this.timeInterval);
      this.timeInterval = null;
    }
    this.updateTime();
  }

  play() {
    this.mps.Play();
    this.startTimer();
  }
  pause() {
    this.mps.Pause();
    this.stopTimer();
  }
  stop() {
    this.mps.Stop();
    this.stopTimer();
  }

}
