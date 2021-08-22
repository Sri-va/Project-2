import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { pipe, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Instructor } from '../instructor';
import { LoginService } from '../login.service';
import { MeetingService } from '../meeting.service';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
})
export class InstructorComponent implements OnInit {
  meetingUrl = '';
  meetingDate: Date | any;
  btnclick: boolean = false;
  instructor: Instructor | any;
  students: Student | any;
  constructor(
    private meetingService: MeetingService,
    private _login: LoginService,
    private _studentservice: StudentService,
    private _http: HttpClient
  ) {}

  tabs = new Map<string, string>([
    ['dashboard', 'Dashboard'],
    ['create-meeting', 'Create Meeting'],
    ['upload-notes', 'Upload notes'],
    ['view-students', 'View Students'],
  ]);
  selectedTab = 'dashboard';
  defaultOrderFn = () => 0;

  ngOnInit() {
    // this._login.instructordata.subscribe((data: any) => {
    //   this.instructor = data;
    // });
    this._login
      .GetLoginInstructor('jas@gmail.com', 'jas123')
      .subscribe((data) => (this.instructor = data));
  }

  updateMeeting() {
    this.meetingService.SetMeeting(
      this.meetingUrl,
      this.meetingDate,
      this.instructor.teacherId
    );
    this.btnclick = true;
    const timeout = setTimeout(() => {
      this.btnclick = false;
      clearTimeout(timeout);
    }, 5000);
  }

  fileName = '';
  uploadProgress: number | undefined;
  uploadSub: Subscription | any;
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.item(0);

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('files', file);

      const upload$ = this._http
        .post('http://localhost:9090/uploadFiles', formData, {
          observe: 'events',
          reportProgress: true,
        })
        .pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      });

      upload$.subscribe();
    }
  }
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
  viewStudentsByCourse() {
    this.students = this._studentservice
      .GetStudentsByCourse(this.instructor.course)
      .subscribe((data) => console.log(data));
  }
}
