import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTimeslotComponent } from './booking-timeslot.component';

describe('BookingTimeslotComponent', () => {
  let component: BookingTimeslotComponent;
  let fixture: ComponentFixture<BookingTimeslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTimeslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
