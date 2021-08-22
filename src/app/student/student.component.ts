import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  meetingDate: Date;
  studentName = '';
  password = '';
  student: Student | any;
  today = new Date();
  constructor(
    private _getmeeting: MeetingService,
    private _login: LoginService,
    private _http: HttpClient
  ) {}
  tabs = new Map<string, string>([
    ['dashboard', 'Dashboard'],
    ['ongoing-meeting', 'Ongoing meeting'],
    ['upcoming-meeting', 'Upcoming meeting'],
    ['notes', 'Notes'],
  ]);
  selectedTab = 'dashboard';
  defaultOrderFn = () => 0;
  ngOnInit() {
    this._login
      .GetLoginStudents('ap@gmail.com', 'astha123')
      .subscribe((data) => (this.student = data));
    this._getmeeting.GetMeeting().subscribe((observer) => {
      this.student = observer;
      this.meetingDate = observer.urlDate;
    });
  }

  // ngOnDestroy() {
  //   this.sub?.unsubscribe();
  // }

  //   downloadFile(route: string, filename: string = null): void{

  //     const baseUrl = 'http://localhost:9090/downloadFile/1';
  //     const token = 'my JWT';
  //     const headers = new HttpHeaders().set('authorization','Bearer '+token);
  //     this._http.get(baseUrl + route,{headers, responseType: 'blob' as 'json'}).subscribe(
  //         (response: any) =>{
  //             let dataType = response.type;
  //             let binaryData = [];
  //             binaryData.push(response);
  //             let downloadLink = document.createElement('a');
  //             downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
  //             if (filename)
  //                 downloadLink.setAttribute('download', filename);
  //             document.body.appendChild(downloadLink);
  //             downloadLink.click();
  //         }
  //     )
  // }
}
