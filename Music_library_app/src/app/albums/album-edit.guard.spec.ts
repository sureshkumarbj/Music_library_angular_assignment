import { TestBed, async, inject } from '@angular/core/testing';

import { AlbumEditGuard } from './album-edit.guard';

describe('AlbumEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlbumEditGuard]
    });
  });

  it('should ...', inject([AlbumEditGuard], (guard: AlbumEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
