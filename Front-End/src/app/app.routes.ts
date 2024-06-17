import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { SearchAndFilterComponent } from './Components/search-and-filter/search-and-filter.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { GradesComponent } from './Components/grades/grades.component';
import { authGuard } from './Guards/auth.guard';


export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home/courses', component: CoursesComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchAndFilterComponent },
  { path: 'home/grades', component: GradesComponent, canActivate: [authGuard] },
];
