import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private API_URL = 'http://127.0.0.1:3000/auth';

  login(user: any) {
    return fetch(`${this.API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  register(user: any): Observable<any> {
    return from(
      fetch(`${this.API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );
  }

}
