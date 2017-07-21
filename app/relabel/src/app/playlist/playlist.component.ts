import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Track } from "../models/track";
import { User } from "../models/user";
import { Playlist } from "../models/playlist";
import { TrackService } from "../services/track.service";
import { PlaylistService } from "../services/playlist.service";
import { PlaylistPlayerService } from "../services/playlist-player.service";

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

  constructor(private tracktService: TrackService, private playlistPlayerService: PlaylistPlayerService, private playlistService: PlaylistService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.playlistService.getPlaylistsById(this.user._id).then((pl)=> {
      this.playlists = pl;
      console.log(this.playlists[0].tracks[0]);
      this.rows = [];
      for (let i = 0; i < this.numRows(); i++) {
        this.rows.push(this.getRow(i));
      }
    });
    this.playlistService.playlistSelected.subscribe(
         (playlist:Playlist)=>{
           this.playlistSelected = playlist;
         }
     );
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
      // this.playlistService.playlistSelected.emit(playlist)
      
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
