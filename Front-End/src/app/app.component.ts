import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: HTTP_INTERCEPTORS, useValue: jwtInterceptor, multi: true }]
})
export class AppComponent {
  title = 'Ultatel Task';
}
