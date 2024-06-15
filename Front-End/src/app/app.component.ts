import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HttpClientModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: HTTP_INTERCEPTORS, useValue: jwtInterceptor, multi: true }]
})
export class AppComponent {
  title = 'Ultatel Task';
}
