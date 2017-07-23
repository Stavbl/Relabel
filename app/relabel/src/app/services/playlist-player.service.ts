import { Injectable, EventEmitter } from '@angular/core';
import { Playlist} from '../models/playlist';
import { Track } from '../models/track';

@Injectable()
export class PlaylistPlayerService {
  playlist:Playlist;
  audio = new Audio();
  itemSelected = new EventEmitter<Track>();
  currentTrack = -1;
  loop = false;
  public shuffle = false;
  playedTracks = [];
  tracks = [];

  constructor() { 
  }
  load(pl:Playlist) {
    this.playlist = pl;
    this.tracks = [];
    for (var i = 0; i < this.playlist.tracks.length; i += 1) {
      this.tracks.push(i);
    }
    this.playedTracks = [];
    if (this.playlist.tracks.length == 0) { return; }
    this.currentTrack = 0;
    this.loadSong();
    this.play();
  }
  loadSong() {
    this.audio.src = this.playlist.tracks[this.currentTrack].url;
    this.audio.load();
    this.playedTracks.push(this.currentTrack);
    var i = this.tracks.indexOf(this.currentTrack);
    if (i >= 0) {
      this.tracks.splice(i, 1);
    }
    this.play();
  }
  getNextTrack() {
    if (this.shuffle) {
      if (this.tracks.length > 0) {
        return this.tracks[Math.round(Math.random()*this.tracks.length) % this.tracks.length];
      }
      return this.playlist.tracks.length;
    } else {
      return this.currentTrack + 1;
    }
  }
  next() {
    this.currentTrack = this.getNextTrack();
    if (this.currentTrack < this.playlist.tracks.length) {
      this.loadSong();
    } else if (this.loop) {
      this.tracks = [];
      this.playedTracks = [];
      for (var i = 0; i < this.playlist.tracks.length; i += 1) {
        this.tracks.push(i);
      }
      this.currentTrack = 0;
      this.loadSong();
    } else {
      this.pause();
    }
  }
  prev() {
    if (this.playedTracks.length > 1) {
      this.tracks.push(this.playedTracks.pop());

      this.currentTrack = this.playedTracks.pop();
      this.loadSong();
    } else if (this.playedTracks.length > 0) {
      this.currentTrack = this.playedTracks.pop();
      this.loadSong();
    }
  }
  pause() {
    this.audio.pause();
  }
  play() {
    this.audio.play();
  }
  shuffle_toggle() {
    if(this.shuffle)
      this.shuffle = false;
    else
      this.shuffle = true;
  }
  loop_toggle() {
    if(this.loop)
      this.loop = false;
    else
      this.loop = true;
  }
  getTotalTime() {
    var total = 0;
    if(!this.playlist)
      return 0;
    this.playlist.tracks.forEach(tr => {
      total += tr.length;
    });
    return total;
  }
  getCurrentTime() {
    var totalTime = this.getTotalTime();
    for (var i = 0; i < this.tracks.length; i+=1) {
      var num = this.tracks[i];
      totalTime -= this.playlist.tracks[num].length;
    }
    if (this.currentTrack >= 0 && this.currentTrack < this.playlist.tracks.length) {
      totalTime -= this.playlist.tracks[this.currentTrack].length - this.audio.currentTime;
    }
    return Math.floor(totalTime);
  }
  getCurrentTrack() {
    if(this.currentTrack != -1) {
      return this.playlist.tracks[this.currentTrack];
    }
    else
      return null;
  }
}
