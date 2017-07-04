import { Component, OnInit } from '@angular/core';
import { Track } from "../models/track";
import { User } from "../models/user";
import { Playlist } from "../models/playlist";
import { TrackService } from "../services/track.service";
import { PlaylistService } from "../services/playlist.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tracks: Track[];
  rows: Track[][] = [];
  user: User;
  playlists: Playlist[]; 

  constructor(private tracktService: TrackService, private playlistService: PlaylistService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.tracktService.getTracksByPref(this.user._id).then((trk) => {
      this.tracks = trk;
      this.rows = [];
      for (let i = 0; i < this.numRows(); i++) {
        this.rows.push(this.getRow(i));
      }
    });
    this.playlistService.getPlaylistsById(this.user._id).then((pl)=> {
      this.playlists = pl;
    });
  }

  numRows(): number {
    return Math.max(Math.ceil((this.tracks.length) / 3), 0);
  }

  getRow(i: number) {
    const startIndex = (i) * 3;
    return this.tracks.slice(startIndex, startIndex + 3);
  }

  showMore(id: string) {
     
  }

}
