import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { MeetingService } from '../meeting.service';
import { Student } from '../student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  count = 5;
  meetingDate = new Date(2021, 8, 21).toDateString();
  studentName = '';
  password = '';
  student: Student | any;
  today = new Date().toDateString();
  constructor(
    private _getmeeting: MeetingService,
    private _login: LoginService
  ) {}
  tabs = new Map<string, string>([
    ['dashboard', 'Dashboard'],
    ['ongoing-meeting', 'Ongoing meeting'],
    ['upcoming-meeting', 'Upcoming meeting'],
    ['notes', 'Notes'],
    ['group-Chat', 'Group Chat'],
  ]);
  selectedTab = 'dashboard';
  defaultOrderFn = () => 0;
  ngOnInit() {
    // this._getmeeting.GetMeeting().subscribe((observer) => {
    //   this.student = observer;
    //   this.meetingDate = observer.meetingDate.getDate();
    // });
  }

  // ngOnDestroy() {
  //   this.sub?.unsubscribe();
  // }

  showUrl() {}
}
