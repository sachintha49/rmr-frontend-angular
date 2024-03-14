import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public createUser(user: User) {
    return this.http.post<User>('http://localhost:8080/users/create', user, httpOptions);
  }

  public getUserById(id : number) {
    return this.http.get<User>('http://localhost:8080/users/' + id);
  }
}
