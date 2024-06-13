import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsersService } from '../../Services/users.service';
import { AuthService } from '../../Services/Authentication/auth.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  passwordValid = true;
  passwordMatch = true;
  // registerForm: any;

  constructor(private router: Router, private authService: AuthService) {

  }
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });





  onSubmit(e: Event) {
    e.preventDefault();
    this.fullNameValid = this.registerForm.controls['fullName'].valid;
    this.emailValid = this.registerForm.controls['email'].valid;
    this.passwordValid = this.registerForm.controls['password'].valid;
    this.passwordMatch = this.registerForm.controls['password'].value === this.registerForm.controls['confirmPassword'].value;

    console.log(this.fullNameValid, this.emailValid, this.passwordValid, this.passwordMatch);
    console.log(this.registerForm.valid);
    console.log(this.registerForm.value);



    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    }
  }

}
