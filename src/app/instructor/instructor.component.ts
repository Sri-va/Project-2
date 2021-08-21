import { Component, OnInit } from '@angular/core';
import { Instructor } from '../instructor';
import { LoginService } from '../login.service';
import { MeetingService } from '../meeting.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
})
export class InstructorComponent implements OnInit {
  meetingUrl = '';
  btnclick: boolean = false;
  instructor: Instructor | any;
  constructor(
    private meetingService: MeetingService,
    private _login: LoginService
  ) {}

  tabs = new Map<string, string>([
    ['dashboard', 'Dashboard'],
    ['create-meeting', 'Create Meeting'],
    ['upload-notes', 'Upload notes'],
    ['groupchat', 'Groupchat'],
  ]);
  selectedTab = 'dashboard';
  defaultOrderFn = () => 0;

  ngOnInit() {
    this.meetingService.SetMeeting(this.meetingUrl);
    this._login
      .GetLoginInstructor()
      .subscribe((observer) => (this.instructor = observer));
  }

  updateMeeting() {
    this.meetingService.SetMeeting(this.meetingUrl);
    this.btnclick = true;
    const timeout = setTimeout(() => {
      this.btnclick = false;
      clearTimeout(timeout);
    }, 5000);
  }

  //   fileChange(event) {
  //     let fileList: FileList = event.target.files;
  //     if(fileList.length > 0) {
  //         let file: File = fileList[0];
  //         let formData:FormData = new FormData();
  //         formData.append('uploadFile', file, file.name);
  //         let headers = new Headers();
  //         /** In Angular 5, including the header Content-Type can invalidate your request */
  //         headers.append('Content-Type', 'multipart/form-data');
  //         headers.append('Accept', 'application/json');
  //         let options = new RequestOptions({ headers: headers });
  //         this.http.post(`${this.apiEndPoint}`, formData, options)
  //             .map(res => res.json())
  //             .catch(error => Observable.throw(error))
  //             .subscribe(
  //                 data => console.log('success'),
  //                 error => console.log(error)
  //             )
  //     }
  // }
}
