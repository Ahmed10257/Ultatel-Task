import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private API_URL = 'http://127.0.0.1:3000/auth';

  login(email: string, password: string): Observable<any> {
    console.log(email, password);

    return this.http.post(`${this.API_URL}/login`, { email, password }, {
      withCredentials: true
    });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, user);
  }

}
