import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Authentication/auth.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) { }

  emailValid = true;
  passwordValid = true;
  email: any
  password: any

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    //Checking the validity of the form fields to display the error messages
    this.emailValid = this.loginForm.controls['email'].valid;
    this.passwordValid = this.loginForm.controls['password'].valid;

    //Getting the values of the form fields to send them to the server
    this.email = this.loginForm.controls['email'].value;
    this.password = this.loginForm.controls['password'].value;

    if (this.loginForm.valid) {
      //Sending the credentials to the server
      this.authService.login(this.email, this.password).subscribe((response: any) => {
        /*If the response contains an access token, the user is logged in successfully
        and will be redirected to the home page*/
        if (response.access_token) {
          this.router.navigate(['/home']);

          Swal.fire({
            icon: 'success',
            title: 'Welcome!',
            text: 'You have successfully logged in',
          });
          //Saving the token in the local storage
          localStorage.setItem('UserToken', response.access_token);
          //In case the credentials are wrong, an error message will be displayed
        } else {
          console.error('There was an error!',);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Credentials! Please try again',
          });
        }
      });
    }
  }
}
