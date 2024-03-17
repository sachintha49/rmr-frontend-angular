import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoggedUserService } from '../service/logged-user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnDestroy {
  subscription: Subscription;
  userType: string | undefined = "";


  constructor(private loggedUserService: LoggedUserService, private router: Router) {
    this.subscription = this.loggedUserService.buttonClicked$.subscribe((clicked) => {
      this.userType = clicked;
      console.log(clicked);
    });
  }

  isEvenNumber(): string {
    if (this.userType == "admin") {
      return "RES_ADMIN";
    }
    if (this.userType == "user") {
      return "USER";
    }
    if (this.userType == "system") {
      return "USER";
    }
    return "";
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  /* Profile drop down functions */
  showDropdown: boolean = false;
  showDropdownMenuItem: boolean = false;
  showDropdownCuisine: boolean = false;
  username: string = "Username";

  ngOnInit(): void {
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleDropdownMenuItem(){
    this.showDropdownMenuItem = !this.showDropdownMenuItem;
  } 

  signOffSystem(): void {
    this.loggedUserService.updateButtonClickedState('');
    this.router.navigate(["/login"]);
  }
}
