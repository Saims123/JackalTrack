import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotSupervisorComponent } from './timeslot-supervisor.component';

describe('TimeslotSupervisorComponent', () => {
  let component: TimeslotSupervisorComponent;
  let fixture: ComponentFixture<TimeslotSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeslotSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
