import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Authentication/auth.service';
import { OnInit } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnChanges {
  constructor(private router: Router, private authService: AuthService) { }
  title = 'Front-End';
  isUserLoggedIn: boolean = false;
  user: {} = {};

  ngOnInit() {
    if (localStorage.getItem('UserToken')) {
      this.isUserLoggedIn = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userToken']) {
      if (localStorage.getItem('UserToken')) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    }
  }

  ngDoCheck() {
    if (localStorage.getItem('UserToken')) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }


  logout() {
    localStorage.removeItem('UserToken');
    this.isUserLoggedIn = false;
    this.router.navigate(['/login']);
  }



}
