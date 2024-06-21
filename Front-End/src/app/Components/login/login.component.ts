import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Authentication/auth.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  emailValid = true;
  passwordValid = true;
  email: any
  password: any

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {

  }

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
        if (response.statusCode == 200) {
          //Saving the token in the local storage
          localStorage.setItem('UserToken', response.access_token);
          //In case the credentials are correct, redirect to home page
          this.router.navigate(['/home'], { replaceUrl: true }).then(() => {
            //Display success message after the home page is loaded
            Swal.fire({
              icon: 'success',
              title: 'Welcome!',
              text: 'You have successfully logged in',
            });
          });
        } else {
          //In case the credentials are wrong, display error message
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Credentials! Please try again',
          });
        }
      }, () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong Credentials! Please try again',
        });
      });
    }
  }
}
