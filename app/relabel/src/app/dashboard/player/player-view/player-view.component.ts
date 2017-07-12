import {  Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent {

  @Input() paused;
  @Output() backward = new EventEmitter();
  @Output() pauseplay = new EventEmitter();
  @Output() forward = new EventEmitter();
  @Output() random = new EventEmitter();
  @Output() stop = new EventEmitter();
  @Input() elapsed: string;
  @Input() total: string;
  @Input() current: number;
}
