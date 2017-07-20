import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { PlaylistService } from '../../services/playlist.service';
import { TrackService } from "../../services/track.service";
import { Track } from "../../models/track";
import { Playlist } from "../../models/playlist";


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{
  @Input() track: Track;
  @Input() playlist: Playlist;
  title;
  position;
  elapsed;
  duration;
  paused = true;
  plalyistCount = 1;
  tracks: any[] = [];
  filteredTracks: any[] = [];
  backgroundStyle;

  constructor(private tracktService: TrackService,
    private playlistService: PlaylistService,
    private playerService: PlayerService
  ){}

  ngOnInit() {
    this.playerService.play(this.playlist.tracks[0].url);
    this.playerService.audio.onended = this.handleEnded.bind(this);
    this.playerService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
    this.playlistService.playlistSelected.subscribe(
         (playlist:Playlist)=>{
           console.log("inside playlist event listning");
           this.playerService.play(playlist.tracks[0].url);
           this.plalyistCount = 1;
         }
     );
  }

  handleEnded(e) {
    // this.handleRandom();
    this.playerService.play(this.playlist.tracks[this.plalyistCount].url);
    this.plalyistCount++;
  }

  handleRandom() {
    const randomTrack = this.playerService.randomTrack(this.tracks);
    this.playerService.play(randomTrack.stream_url)
    this.title = randomTrack.title;
  }

  handlePausePlay() {
      console.log("in pause play");
      if(this.playerService.audio.paused) {
        this.paused = true;
        this.playerService.audio.play()
      } else {
        this.paused = false;
        this.playerService.audio.pause()
      }
  }

  handleStop() {
    this.playerService.audio.pause();
    this.playerService.audio.currentTime = 0;
    this.paused = false;
  }

  handleBackward() {
    let elapsed =  this.playerService.audio.currentTime;
    console.log(elapsed);
    if(elapsed >= 5) {
      this.playerService.audio.currentTime = elapsed - 5;
    }
  }

  handleForward() {
    let elapsed =  this.playerService.audio.currentTime;
    const duration =  this.playerService.audio.duration;
    if(duration - elapsed >= 5) {
      this.playerService.audio.currentTime = elapsed + 5;
    }
  }

  handleTimeUpdate(e) {
    const elapsed =  this.playerService.audio.currentTime;
    const duration =  this.playerService.audio.duration;
    this.position = elapsed / duration;
    this.elapsed = this.playerService.formatTime(elapsed);
    this.duration = this.playerService.formatTime(duration);
  }

  handleQuery(payload) {
      this.playerService.findTracks(payload).subscribe(tracks => {
        this.filteredTracks = tracks;
      });
  }

  handleUpdate(track) {
    console.log("in update in player");
    this.playerService.play(track.url);
    this.title = track.name;
  }


}