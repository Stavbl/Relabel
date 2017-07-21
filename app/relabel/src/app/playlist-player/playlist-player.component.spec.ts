import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistPlayerComponent } from './playlist-player.component';

describe('PlaylistPlayerComponent', () => {
  let component: PlaylistPlayerComponent;
  let fixture: ComponentFixture<PlaylistPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
