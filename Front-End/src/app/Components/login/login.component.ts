import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Authentication/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) { }

  emailValid = true;
  passwordValid = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.emailValid = this.loginForm.controls['email'].valid;
    this.passwordValid = this.loginForm.controls['password'].valid;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).then((response) => {
        if (response.ok) {
          this.router.navigate(['/home']);
        } else {
          console.error('There was an error!', response);
        }
      });
    }
  }
}
