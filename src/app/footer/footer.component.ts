import { Component } from '@angular/core';
import { LoggedUserService } from '../service/logged-user.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
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
