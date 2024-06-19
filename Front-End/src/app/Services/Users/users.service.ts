import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_URL = 'https://ultatel-task-production-6661.up.railway.app//users';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.API_URL);
  }

  getUserById(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  createUser(user: any) {
    return this.http.post(this.API_URL, user);
  }

  updateUser(user: any) {
    return this.http.put(`${this.API_URL}/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
