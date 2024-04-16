import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css',
  providers: [UserService]
})
export class UserRegistrationComponent {

  constructor(private userService: UserService, private router: Router) { }

  userRegistration: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl('')
  })

  onSaveUser() {
    const user: User = new User();
    user.firstName = this.userRegistration.value.firstName;
    user.lastName = this.userRegistration.value.lastName;
    user.userName = this.userRegistration.value.username;
    user.password = this.userRegistration.value.password;
    user.email = this.userRegistration.value.email;
    user.address = this.userRegistration.value.address;


    console.log(this.userRegistration.value);
    this.userService.createUser(user)
        .subscribe( data => {
          alert("User created successfully.");
          this.router.navigate(["/home"]);
        });
  }

}
