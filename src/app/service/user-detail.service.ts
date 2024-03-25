import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  
  private usernameSubject = new Subject<string>();
  private roleSubject = new Subject<string>();
  private restaurantIdSubject = new Subject<string>();

  constructor() { }

  setUsername(username: string) {
    this.usernameSubject.next(username);
  }

  setRole(role: string) {
    this.roleSubject.next(role);
  }

  setRestaurantId(id: string) {
    this.restaurantIdSubject.next(id);
  }

  getUsername() {
    return this.usernameSubject.asObservable();
  }

  getRole() {
    return this.roleSubject.asObservable();
  }

  getRestaurantId() {
    return this.restaurantIdSubject.asObservable();
  }

  clearUserDetails(): void {
    this.usernameSubject.next("");
    this.roleSubject.next("");
    this.restaurantIdSubject.next("");
  }

}
