import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoggedUserService } from '../service/logged-user.service';
import { DOCUMENT } from '@angular/common';
import { UserDetailService } from '../service/user-detail.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  username: string | undefined;
  role: string | undefined;
  restaurantId: string | undefined;

  constructor(private loggedUserService: LoggedUserService, private router: Router, private userService : UserDetailService) {
   
  }

  /* Profile drop down functions */
  showDropdown: boolean = false;
  showDropdownMenuItem: boolean = false;
  showDropdownCuisine: boolean = false;

  ngOnInit(): void {
    this.userService.getUsername().subscribe(username => {
      this.username = username;
      console.log(this.username);
    });

    this.userService.getRole().subscribe(role => {
      this.role = role ?? 'NONE';
      console.log(this.role);
    });

    this.userService.getRestaurantId().subscribe(id => {
      this.restaurantId = id;
      console.log(this.restaurantId);
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleDropdownMenuItem() {
    this.showDropdownMenuItem = !this.showDropdownMenuItem;
  }

  signOffSystem(): void {
    this.userService.clearUserDetails();
    this.router.navigate(["/login"]);
  }
}
