import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPlayerComponent } from './mini-player.component';

describe('MiniPlayerComponent', () => {
  let component: MiniPlayerComponent;
  let fixture: ComponentFixture<MiniPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
