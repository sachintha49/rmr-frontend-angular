import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  public login(user : any) {
    const base64Credential: string = btoa( user.username+ ':' + user.password);
    const authToken = "Basic " + base64Credential;
    localStorage.setItem("RRS_LOGGED_USER_TOKEN", authToken);
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      'Authorization' : authToken
      })
    };
    return this.http.post<User>('http://localhost:8080/auth/login', user, httpOptions);
  }

  getAuthToken() {
    return localStorage.getItem("RRS_LOGGED_USER_TOKEN");
  }
}
