import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TimeslotService, Timeslot, MeetingPeriod } from 'src/app/services/timeslots/timeslot.service';
import {
  SupervisionService,
  Student,
  SupervisionGroup,
  Supervisor
} from 'src/app/services/supervision/supervision.service';
import { forkJoin, Subscription } from 'rxjs';
import { CustomMailService } from 'src/app/services/graph/custom-mail.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-timetable-supervisor',
  templateUrl: './timetable-supervisor.component.html',
  styleUrls: ['./timetable-supervisor.component.scss']
})
/*
# Timtable for supervisor to view the timeslots created for the meetings
# Also shows students who has not booked meeting timeslots
*/
export class TimetableSupervisorComponent implements OnInit, OnDestroy {
  timeslots: Timeslot[] = [];
  supervisor: Supervisor;
  meetingPeriod: MeetingPeriod;
  subscription: Subscription[] = [];
  studentsNotBooked: Student[] = [];
  isActive = false;
  constructor(
    private timeslotService: TimeslotService,
    private supervisionService: SupervisionService,
    private cdr: ChangeDetectorRef,
    private customMailService: CustomMailService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.updateTimetable();
  }
  updateTimetable() {
    this.timeslotService.getSupervisorTimeslotsFromNest()
    .subscribe((timeslotPeriods: any) => {
      (this.supervisor = timeslotPeriods.supervisor),
      (this.timeslots = timeslotPeriods.timeslots);
      this.meetingPeriod = timeslotPeriods.meetingPeriod;
      this.isActive = this.timeslotService.checkTimetableStatus(this.meetingPeriod.end);
      this.findStudentsNotBooked();
      this.cdr.detectChanges();
    });
  }
  deleteCurrentTimeslot() {
    this.timeslotService.deleteCurrentTimeslots().subscribe(_ => {
      this.toastService.success('Successfully deleted current timeslot', 'Delete Timeslot', {
        onActivateTick: true
      });
      this.updateTimetable();
      this.cdr.detectChanges();
    });
  }

  sendICS(timeslot) {
    timeslot.sendICS = !timeslot.sendICS;
    const studentSub = this.supervisionService.getSingleStudent(timeslot.bookedBy.uniqueID);
    const timeslotUpdateSub = this.timeslotService.updateTimeslot(timeslot, this.supervisor.uniqueID);
    const multiFork = forkJoin([studentSub, timeslotUpdateSub]).subscribe((results: any) => {
      this.customMailService.sendTimeslotEventToStudent(
        results[0].student.email,
        'Project Meeting',
        'Final year project meeting timeslot',
        this.meetingPeriod,
        timeslot
      );
    });
    this.subscription.push(multiFork);
  }

  findStudentsNotBooked() {
    // DT : Could be improved with third party advanced filtering system using lambda
    let students: Student[] = [];
    const sub = this.supervisionService.supervisionGroup.subscribe((group: SupervisionGroup) => {
      this.studentsNotBooked = group[0].students;
      group[0].students.forEach(student => {
        this.timeslots.forEach(timeslot => {
          if (student.uniqueID === timeslot.bookedBy.uniqueID) {
            students.push(student);
          }
        });
      });
      students.forEach(student => {
        this.studentsNotBooked.splice(this.studentsNotBooked.indexOf(student), 1);
      });
      this.cdr.detectChanges();
      this.subscription.push(sub);
    });
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
