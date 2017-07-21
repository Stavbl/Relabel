import { TestBed, inject } from '@angular/core/testing';

import { PlaylistPlayerService } from "./playlist-player.service";

describe('PlalistPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistPlayerService]
    });
  });

  it('should be created', inject([PlaylistPlayerService], (service: PlaylistPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
