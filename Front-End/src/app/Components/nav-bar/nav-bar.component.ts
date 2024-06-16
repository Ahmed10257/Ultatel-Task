import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Authentication/auth.service';



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router, private authService: AuthService) { }
  title = 'Front-End';
  isUserLoggedIn: boolean = false;
  // isAdmin: boolean = false;
  // isTeacher: boolean = false;
  // isStudent: boolean = false;
  // isParent: boolean = false;

  ngOnInit() {
    if (localStorage.getItem('UserToken')) {
      this.isUserLoggedIn = true;
    }
  }



  //     if (localStorage.getItem('role') == 'admin') {
  //       this.isAdmin = true;
  //     }
  //     if (localStorage.getItem('role') == 'teacher') {
  //       this.isTeacher = true;
  //     }
  //     if (localStorage.getItem('role') == 'student') {
  //       this.isStudent = true;
  //     }
  //     if (localStorage.getItem('role') == 'parent') {
  //       this.isParent = true;
  //     }
  //   }
  // }

  logout() {
    localStorage.removeItem('UserToken');
    this.isUserLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
