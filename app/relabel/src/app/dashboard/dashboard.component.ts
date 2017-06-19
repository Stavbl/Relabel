import { Component, OnInit } from '@angular/core';
import { TrackService } from "app/track.service";
import { Track } from "app/track";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tracks: Track[];
  rows: Track[][] = [];

  constructor(private tracktService: TrackService) { }

  ngOnInit() {
    this.tracktService.getTracksByPref("Tale of Us").then((trk) => {
      this.tracks = trk;
      this.rows = [];
      for (let i = 0; i < this.numRows(); i++) {
        this.rows.push(this.getRow(i));
      }
    });
  }

  numRows(): number {
    return Math.max(Math.ceil((this.tracks.length) / 3), 0);
  }

  getRow(i: number) {
    const startIndex = (i) * 3;
    return this.tracks.slice(startIndex, startIndex + 3);
  }

}
