import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  signup(
    email: string,
    password: string,
    age: number,
    username: string
  ): Observable<any> {
    return this.http.post(
      `${this.authUrl}/signup`,
      { email, password, age, username },
      { withCredentials: true }
    );
  }

  signin(signin: string, password: string): Observable<any> {
    return this.http.post(
      `${this.authUrl}/signin`,
      { signin, password },
      { withCredentials: true }
    );
  }

  // signout(): Observable<any> {
  //   return this.http.post(
  //     `${this.authUrl}/signout`,
  //     {},
  //     { withCredentials: true }
  //   );
  // }
}
