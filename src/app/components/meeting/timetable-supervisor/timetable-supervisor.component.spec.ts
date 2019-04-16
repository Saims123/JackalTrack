import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableSupervisorComponent } from './timetable-supervisor.component';

describe('TimetableSupervisorComponent', () => {
  let component: TimetableSupervisorComponent;
  let fixture: ComponentFixture<TimetableSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
