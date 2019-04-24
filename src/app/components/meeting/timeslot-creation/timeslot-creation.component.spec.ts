import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotCreationComponent } from './timeslot-creation.component';

describe('TimeslotSupervisorComponent', () => {
  let component: TimeslotCreationComponent;
  let fixture: ComponentFixture<TimeslotCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeslotCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
