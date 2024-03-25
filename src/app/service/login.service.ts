import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { UserLogin } from '../model/UserLogin';

const httpOptions = {
  headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
  };

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  public login(user : UserLogin) {
    return this.http.post<UserLogin>('http://localhost:8080/auth/login', user, httpOptions);
  }
}
