import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../Services/Authentication/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  fullNameValid = true;
  emailValid = true;
  passwordValid = false;
  passwordMatch = true;

  isLengthValid: boolean = true;
  hasLowercaseChar: boolean = true;
  hasUppercaseChar: boolean = true;
  hasNumber: boolean = true;
  hasSpecialChar: boolean = true;
  passwordMessage: string = '';
  passwordMessageClass: string = ''

  constructor(private router: Router, private authService: AuthService) {

  }
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  validatingPasswords(password: any): boolean {
    const lengthRegex = /^.{8,}$/;                       //Checking the length of the password
    const lowercaseRegex = /[a-z]/;                      //Checking for lowercase characters
    const uppercaseRegex = /[A-Z]/;                      //Checking for uppercase characters
    const numberRegex = /\d/;                            //Checking for numbers
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;   //Checking for special characters

    this.isLengthValid = lengthRegex.test(password);
    this.hasLowercaseChar = lowercaseRegex.test(password);
    this.hasUppercaseChar = uppercaseRegex.test(password);
    this.hasNumber = numberRegex.test(password);
    this.hasSpecialChar = specialCharRegex.test(password);

    const strengthScore = [this.hasNumber, this.hasLowercaseChar, this.hasUppercaseChar, this.hasSpecialChar, this.isLengthValid].filter(value => !value).length;
    //Checking the strength of the password to display the message
    switch (strengthScore) {
      case 0:
        this.passwordMessage = 'Very Strong';
        this.passwordMessageClass = 'alert alert-success';
        break;
      case 1:
        this.passwordMessage = 'Strong';
        this.passwordMessageClass = 'alert alert-primary';
        break;
      case 2:
        this.passwordMessage = 'Moderate';
        this.passwordMessageClass = 'alert alert-info';
        break;
      case 3:
        this.passwordMessage = 'Weak';
        this.passwordMessageClass = 'alert alert-warning';
        break;
      case 4:
        this.passwordMessage = 'Very Weak';
        this.passwordMessageClass = 'alert alert-danger';
        break;
      case 5:
        this.passwordMessage = 'Very Weak';
        this.passwordMessageClass = 'alert alert-danger';
        break;
      default:
        this.passwordMessage = 'Very Strong';
        this.passwordMessageClass = 'alert alert-success';
    }

    if (this.isLengthValid && this.hasLowercaseChar && this.hasUppercaseChar && this.hasNumber && this.hasSpecialChar) {
      return true;
    }

    return false;
  }

  onSubmit(e: Event) {
    e.preventDefault();

    //Checking the validity of the form fields to display the error messages
    this.fullNameValid = this.registerForm.controls['fullName'].valid;
    this.emailValid = this.registerForm.controls['email'].valid;
    this.passwordValid = this.validatingPasswords(this.registerForm.controls['password'].value);
    this.passwordMatch = this.registerForm.controls['password'].value === this.registerForm.controls['confirmPassword'].value;

    //Checking if the form is valid to submit the data
    if (this.registerForm.valid && this.passwordValid && this.passwordMatch) {
      this.authService.register(this.registerForm.value).subscribe((data) => {

        //Displaying the success message
        Swal.fire({
          icon: 'success',
          title: 'Successfully Registered!',
          showConfirmButton: true,
        });
        this.router.navigate(['/login']);
      }, (error) => {
        console.error('There was an error!', error);
        Swal.fire({
          icon: 'error',
          title: 'Email Already Registered!',
          text: 'This email is already registered. Please try again with a different email.',
        });
      });
    } else if (!this.fullNameValid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Name!',
        text: 'Please enter a valid name.',
      });
    } else if (!this.emailValid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email!',
        text: 'Please enter a valid email address.',
      });
    } else if (!this.passwordValid) {
      Swal.fire({
        icon: 'error',
        title: 'Password is Inavlid!',
        text: 'Your password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character.',
      });

    } else if (!this.passwordMatch) {
      Swal.fire({
        icon: 'error',
        title: "Password doesn't match!",
        text: "Your password doesn't Match.",
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred. Please try again later.',
      });
    }
  }
}
