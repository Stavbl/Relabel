import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Track } from "../models/track";
import { User } from "../models/user";
import { Playlist } from "../models/playlist";
import { TrackService } from "../services/track.service";
import { PlaylistService } from "../services/playlist.service";

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

  constructor(private tracktService: TrackService, private playlistService: PlaylistService) { }

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

  onSelected(playlist:Playlist){
      // this.itemSelected.emit();
      console.log("on select - " + playlist.tracks[0]);
        this.playlistService.playlistSelected.emit(playlist)
      
  }

  numRows(): number {
    return Math.max(Math.ceil((this.playlists.length) / 3), 0);
  }

  getRow(i: number) {
    const startIndex = (i) * 3;
    return this.playlists.slice(startIndex, startIndex + 3);
  }

}
