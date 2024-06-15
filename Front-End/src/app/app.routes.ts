import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { SearchAndFilterComponent } from './Components/search-and-filter/search-and-filter.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { GradesComponent } from './Components/grades/grades.component';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home/courses', component: CoursesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchAndFilterComponent },
  { path: 'home/grades', component: GradesComponent },
];
