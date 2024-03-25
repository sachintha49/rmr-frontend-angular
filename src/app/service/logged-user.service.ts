import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  private buttonClickedSubject = new BehaviorSubject<string>('');
  buttonClicked$ = this.buttonClickedSubject.asObservable();

  constructor() {}

  updateButtonClickedState(userDetail: any): void {
    this.buttonClickedSubject.next(userDetail);
  }
}
