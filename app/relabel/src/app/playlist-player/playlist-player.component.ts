import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlaylistPlayerService } from '../services/playlist-player.service';

@Component({
  selector: 'playlist-player',
  templateUrl: './playlist-player.component.html',
  styleUrls: ['./playlist-player.component.css']
})
export class PlaylistPlayerComponent implements OnInit, AfterViewInit {
  ctx = null;
  timeText= null;
  graph = [];
  selectedBar = -1;
  dx = {}
  time = 0;
  totalTime = 0;
  interval;

  constructor(public pps:PlaylistPlayerService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.ctx === null) {
      this.loadCanvas();
    }
  }
  setupGraph() {
    var prevHeight = 10;
    var graph = [];

    for (var i = 0; i < 150; i+=1) {
      //var height = Math.min(30, Math.max(15, prevHeight + getRandomArbitrary(-5,5)));
      //prevHeight = height;
      graph.push(0);
    }
    return graph;
  }
  drawBar() {
    this.ctx.fillStyle = "#4d4d4d";
    this.ctx.fillRect(0,74,600,2);
    for (var i = 0; i < 150; i+=1) {
      var pos = 75 + (3*i);
      this.ctx.fillStyle = "#3a3a3a";
      this.ctx.fillRect(pos,66,1,8);
      this.ctx.fillStyle = "#2a2a2a"
      this.ctx.fillRect(pos,76,1,8);
    }
  }
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  drawGraph(n) {
    for (var i = 0; i < Math.min(150,Math.ceil(150*n)); i+=1) {
      var pos = 75 + (3*i);
    
      this.ctx.fillStyle = "#c4c4c4";
      this.ctx.fillRect(pos,74-this.graph[i],1,this.graph[i]);
      this.ctx.fillStyle = "#414141";
      this.ctx.fillRect(pos,76,1,this.graph[i])

    }
    for (var i = 0; i < 150; i+=1) {
      var pos = 75 + (3*i);
      if (i === this.selectedBar) {
        this.ctx.fillStyle = "#c4c4c4";
        this.ctx.fillRect(pos,74-30,1,30);
        this.ctx.fillStyle = "#414141";
        this.ctx.fillRect(pos,76,1,30)
      }
    }
  }
  updateGraph() {
    this.ctx.clearRect(0,0,600,150);
    this.drawBar();
    for (var i = 0; i < 150; i+=1) {
      if (!this.dx.hasOwnProperty(i)) {
        this.dx[i] = {
          val: Math.random() >=  0.5 ? 1 : -1,
          times: 0
        }
      }
      var dx = this.dx[i].val;
      if (this.pps.audio.paused) {
        dx = -1;
      }
      this.graph[i] = Math.min(30, Math.max(15, this.graph[i] + dx));
      this.dx[i].times += 1;
      if (this.dx[i].times > 10) {
        this.dx[i] = {
          val: Math.random() >=  0.5 ? 1 : -1,
          times: 0
        }
      }  
    }
    
    var timeElapsed = this.pps.getCurrentTime();
    var minutes= Math.floor(timeElapsed/60);
    var seconds = timeElapsed - minutes * 60;
    this.timeText.innerHTML = (("0" + minutes).substr(-2)) + ":" + (("0" + seconds).substr(-2))
    this.drawGraph(timeElapsed/this.pps.getTotalTime());
  }
  loadCanvas() {
    var cnvs:any = document.getElementById("cnvs");
    var ctx = this.ctx = cnvs.getContext("2d");
    var timeText = this.timeText = document.getElementById("time");

    

    this.graph = this.setupGraph();
    this.selectedBar = -1;
    this.drawBar();
    this.dx = {};

    this.time = Math.floor(new Date().getTime()/1000);


    if (this.interval >= 0) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(this.updateGraph.bind(this), 33);
  }

  next() {
    this.pps.next();
  }
  prev() {
    this.pps.prev();
  }
  shuffle_toggle() {
    this.pps.shuffle_toggle();
  }
  loop_toggle() {
    this.pps.loop_toggle();
  }

  playpause() {
    if (this.pps.audio.paused) {
      this.pps.play();
    } else {
      this.pps.pause();
    }
  }


}
