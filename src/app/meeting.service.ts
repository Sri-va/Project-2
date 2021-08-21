import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, Subscriber } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  baseUrl = '';
  // private _obs = new Subject<string>();
  // url$ = this._obs.asObservable();

  constructor(private _http: HttpClient) {}

  httpOptions = {
    Headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  SetMeeting(url: string) {
    this._http.post<any>(
      this.baseUrl,
      JSON.stringify({
        meetingURL: url,
      })
    );
  }
  GetMeeting(): Observable<Student> {
    return this._http.get<Student>(this.baseUrl);
  }

  // ngOnDestroy() {
  //   this._obs.complete();
  // }
}
