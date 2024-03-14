import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoggedUserService } from '../service/logged-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnDestroy {
  subscription: Subscription;
  userType : string | undefined = "";


  constructor(private loggedUserService: LoggedUserService) {
    this.subscription = this.loggedUserService.buttonClicked$.subscribe((clicked) => {
      this.userType = clicked;
      console.log(clicked);
    });
  }

  isEvenNumber(): string {
    if(this.userType == "admin"){
      return "admin";
    }
    if(this.userType == "user"){
      return "user";
    }
    return "";
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
