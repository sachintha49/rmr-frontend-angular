import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LoggedUserService } from '../service/logged-user.service';

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
    private LoggedUserService: LoggedUserService) { }

  userLogin: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  onLoginUser() {

  /*   let admin = { type: "admin", username: "admin", password: "admin" };
    let usr = { type: "user", username: "sachi", password: "1234" };

    localStorage.setItem("admin", JSON.stringify(admin));
    localStorage.setItem("user", JSON.stringify(usr));

    const adminType = JSON.parse(localStorage.getItem('admin')!)?.type;
     */
    let user = {
      username: this.userLogin.value.username,
      password: this.userLogin.value.password
    }
      if(user.username == "admin" && user.password == "admin"){
       Swal.fire({
         position: "top-end",
         icon: "success",
         title: "You have successfully logged in!",
         showConfirmButton: false,
         timer: 2000
       });
       setTimeout(() => {
         this.router.navigate(["/home"]);
       }, 400);
       localStorage.setItem("admin","admin");
       this.LoggedUserService.updateButtonClickedState('admin'); 
     }
 
     if(user.username == "sachintha" && user.password == "1234"){
       Swal.fire({
         position: "top-end",
         icon: "success",
         title: "You have successfully logged in!",
         showConfirmButton: false,
         timer: 2000
       });
       setTimeout(() => {
         this.router.navigate(["/home"]);
       }, 400);
       localStorage.setItem("user","user");
       this.LoggedUserService.updateButtonClickedState("user");
     } 

     if(user.username == "system" && user.password == "system"){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have successfully logged in!",
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(() => {
        this.router.navigate(["/home"]);
      }, 400);
      localStorage.setItem("system","system");
      this.LoggedUserService.updateButtonClickedState("system");
    } 

    /*   console.log(user)
      this.loginService.login(user)
        .subscribe(data => {
          this.router
          this.router.navigate(["/"]);
        }, error => {
          alert("Error occured : " + error.error.message);
        }); */
  }

}
