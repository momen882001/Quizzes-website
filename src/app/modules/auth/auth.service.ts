import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './signup/user.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) {}

  signUp(signupData: User): void {
    this.http.post<User>(environment.APIUrl + 'Register', signupData).subscribe(
      (resData: User) => {
        this.message.create('success', 'Signed up successfully', {
          nzDuration: 3000,
        });
        this.router.navigate(['/login']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  Login(loginData: { email: string; password: string }): void {
    this.http.get<User[]>('/api/users').subscribe(
      (resData: User[]) => {
        resData.map((userData: User) => {
          if (
            userData.email === loginData.email &&
            userData.password === loginData.password
          ) {
            this.message.create('success', 'Logined successfully', {
              nzDuration: 4000,
            });
            if (userData.role === 'ad') {
              this.router.navigate(['/admin']);
            } else if (userData.role === 'te') {
              this.router.navigate(['/teacher']);
            } else if (userData.role === 'st') {
              this.router.navigate(['/student']);
            }
          } else if (userData.email !== loginData.email) {
            this.message.create('error', 'Your email is incorrect', {
              nzDuration: 4000,
            });
          } else if (userData.password !== loginData.password) {
            this.message.create('error', 'Your password is incorrect', {
              nzDuration: 4000,
            });
          }
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
