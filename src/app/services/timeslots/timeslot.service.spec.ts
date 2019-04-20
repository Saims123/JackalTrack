import { TestBed } from '@angular/core/testing';

import { TimeslotService } from './timeslot.service';
import { SupervisionService } from '../supervision/supervision.service';
import { HttpClient , HttpClientModule} from '@angular/common/http';

describe('TimeslotService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient, SupervisionService]
    })
  );

  it('should be created', () => {
    const service: TimeslotService = TestBed.get(TimeslotService);
    expect(service).toBeTruthy();
  });
});
