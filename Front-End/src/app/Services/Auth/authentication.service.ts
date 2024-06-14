import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private API_URL = 'http://127.0.0.1:3000/auth';

  login(email: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { email, password });
  }

  register(user: any) {
    return this.http.post(`${this.API_URL}/register`, user);
  }
}
