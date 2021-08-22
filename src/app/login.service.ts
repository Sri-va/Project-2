import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from './instructor';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  studentUrl = 'http://localhost:9090/loginStudent';
  instructordata: Observable<Instructor> | any;
  studentdata: Observable<Student> | any;
  loginInstructorUrl = 'http://localhost:9090/loginTeacher';

  constructor(private _http: HttpClient) {}

  GetLoginInstructor(name: string, password: string): Observable<Instructor> {
    const body = {
      email: name,
      pass: password,
    };
    this.instructordata = this._http.post<Instructor>(
      this.loginInstructorUrl,
      body
    );
    return this.instructordata;
  }

  GetLoginStudents(name: string, password: string): Observable<Student> {
    const body = {
      email: name,
      pass: password,
    };
    this.studentdata = this._http.post<Student>(this.studentUrl, body);
    return this.studentdata;
  }
}
