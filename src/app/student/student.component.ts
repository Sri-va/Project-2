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
  count: number;
  meetingDate: Date;
  studentName = '';
  password = '';
  student: Student | any;
  today = new Date();
  constructor(private _login: LoginService, private _http: HttpClient) {}
  tabs = new Map<string, string>([
    ['dashboard', 'Dashboard'],
    ['ongoing-meeting', 'Ongoing meeting'],
    ['upcoming-meeting', 'Upcoming meeting'],
    ['notes', 'Notes'],
  ]);
  selectedTab = 'dashboard';
  defaultOrderFn = () => 0;
  ngOnInit() {
    this._login.studentdata.subscribe((data: any) => {
      this.student = data;
      if (
        this.today.toDateString() ===
        new Date(this.student.urlDate).toDateString()
      )
        this.count = 1;
    });
  }

  downloadFile(): void {
    const baseUrl = 'http://localhost:9090/downloadFile/1';

    this._http.get(baseUrl, { responseType: 'blob' }).subscribe((response) => {
      const filename = 'refer.txt';
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(
        new Blob(binaryData, { type: dataType })
      );
      if (filename) downloadLink.setAttribute('download', filename);
      downloadLink.click();
    });
  }
}
