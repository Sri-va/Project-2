import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from './instructor';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  studentUrl = '';
  instructorUrl = 'http://localhost:3000/instructors';
  constructor(private _http: HttpClient) {}

  GetLoginInstructor(): Observable<Instructor> {
    return this._http.get<Instructor>(this.instructorUrl);
  }

  GetLoginStudents(): Observable<Student> {
    return this._http.get<Student>(this.studentUrl);
  }
}
