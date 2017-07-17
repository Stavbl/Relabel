import { TestBed, inject } from '@angular/core/testing';

import { MiniPlayerService } from './mini-player.service';

describe('MiniPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiniPlayerService]
    });
  });

  it('should be created', inject([MiniPlayerService], (service: MiniPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
