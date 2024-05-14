import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LoggedUserService } from '../service/logged-user.service';
import { UserLogin } from '../model/UserLogin';
import { UserDetailService } from '../service/user-detail.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router,
    private LoggedUserService: LoggedUserService, private userDetail: UserDetailService) { }

  userLogin: FormGroup = new FormGroup({
    password: new FormControl(''),
    username: new FormControl('')
  })

  onLoginUser() {
    const userLogin = new UserLogin();
    userLogin.username = this.userLogin.value.username;
    userLogin.password = this.userLogin.value.password;
    console.log(userLogin)

    this.loginService.login(userLogin)
      .subscribe(data => {
        Swal.fire({
          title: "Logged in Successfully!",
          text: "Welcome to the system",
          icon: "success"
        });
        localStorage.clear();
        localStorage.setItem('username', data.username)
        localStorage.setItem('restaurantId', data.restaurantId)
        localStorage.setItem('role', data.role)

        console.log(localStorage)
        if (data.role == "REST_ADMIN") {
          this.router.navigate(['/manage-menu-item/', data.restaurantId]);
        } else {
          this.router.navigate(["/home"]);
        }
      },(error) => {
        Swal.fire({
          title: error.error.message,
          text: "Invalid Details! Please enter correct username password",
          icon: "error"
        });
      })
  }
}

