import { TestBed } from '@angular/core/testing';

import { MeetingNotesService } from './meeting-notes.service';

describe('MeetingNotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeetingNotesService = TestBed.get(MeetingNotesService);
    expect(service).toBeTruthy();
  });
});
