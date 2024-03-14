import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  private buttonClickedSubject = new BehaviorSubject<string>('');
  buttonClicked$ = this.buttonClickedSubject.asObservable();

  constructor() {}

  updateButtonClickedState(state: string): void {
    this.buttonClickedSubject.next(state);
  }
}
