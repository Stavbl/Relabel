import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Routes,RouterModule, Router} from '@angular/router';
import { Track } from "../models/track";
import { User } from "../models/user";
import { Playlist } from "../models/playlist";
import { TrackService } from "../services/track.service";
import { PlaylistService } from "../services/playlist.service";
import { PlaylistPlayerService } from "../services/playlist-player.service";
import { MiniPlayerService } from "../services/mini-player.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  tracks: Track[];
  rows: Playlist[][] = [];
  user: User;
  playlists: Playlist[];
  playlistSelected:Playlist;
  elm;
  selectedPlaylist;
  playlistName: string = '';


  constructor(private tracktService: TrackService,
              private playlistPlayerService: PlaylistPlayerService, 
              private playlistService: PlaylistService,
              public router: Router, 
              private mps: MiniPlayerService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.loadPlaylist();
    this.playlistService.playlistSelected.subscribe(
         (playlist:Playlist)=>{
           this.playlistSelected = playlist;
         }
     );
  }

  loadPlaylist(){
    this.playlists=[];
    this.playlistService.getPlaylistsById(this.user._id).then((pl)=> {
      this.playlists = pl;
      console.log(this.playlists[0].tracks[0]);
      this.rows = [];
      for (let i = 0; i < this.numRows(); i++) {
        this.rows.push(this.getRow(i));
      }
    });
  }

  onSelected(playlist:Playlist, e){
      // this.itemSelected.emit();
      var t = e.target;
      for (var i = 0; i < 20; i+=1) {
        if (t.className == "playlist") { break; }
        t = t.parentNode;
      }
      this.elm = t;
      this.selectedPlaylist = t.getBoundingClientRect();
      console.log("on select - " + playlist.tracks[0]);
      this.playlistPlayerService.load(playlist);
      this.playlistSelected = playlist;
      this.mps.itemSelected.emit(null);
  }

  addNewPlaylist(){
    this.playlistService.addNewPlaylist(this.user._id, this.playlistName).then((res)=> {
       console.log(res);
       this.router.navigate(['./dashboard'])
     });
  }

  removePlaylist(playlistName){
    this.playlistService.removePlaylist(this.user._id, playlistName).then((res)=> {
       console.log(res);
       // this.loadPlaylist();
       this.router.navigate(['./dashboard'])
     });
  }

  closePlaylist() {
    this.playlistPlayerService.pause();
    this.playlistSelected = null;
    this.selectedPlaylist = null;
  }

  numRows(): number {
    return Math.max(Math.ceil((this.playlists.length) / 4), 0);
  }

  getRow(i: number) {
    const startIndex = (i) * 4;
    return this.playlists.slice(startIndex, startIndex + 4);
  }

  onResize(e) {
    if (this.elm) {
      this.selectedPlaylist = this.elm.getBoundingClientRect();
    }
  }

}
