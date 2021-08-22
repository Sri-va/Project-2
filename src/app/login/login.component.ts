import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instructor } from '../instructor';
import { LoginService } from '../login.service';
import { Student } from '../student';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  instructorName = '';
  password = '';
  studentName = '';
  pass = '';
  instructor: Instructor | any;
  student: Student | any;
  constructor(private _login: LoginService, private router: Router) {}

  ngOnInit(): void {}

  validateLoginInstructor() {
    this._login
      .GetLoginInstructor(this.instructorName, this.password)
      .subscribe(() => {
        this.router.navigate(['login', 'instructor']);
      });
  }

  validateLoginStudent() {
    this._login
      .GetLoginInstructor(this.studentName, this.pass)
      .subscribe(() => {
        this.router.navigate(['login', 'student']);
      });
  }
}
