import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}

  httpOptions = {
    Headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };
  GetStudentsByCourse(course: string): Observable<Student> {
    const baseUrl = `http://localhost:9090/allstudentByCourse/${course}`;
    return this._http.get<Student>(baseUrl);
  }
  GetStudentByCourse(course: string): Observable<Student> {
    const baseUrl = `http://localhost:9090/allstudentByCourse/${course}`;
    return this._http.get<Student>(baseUrl);
  }
}
