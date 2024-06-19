import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private API_URL = 'ultatel-task-production-6661.up.railway.app/students';

  constructor(private http: HttpClient) { }

  getStudents() {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a GET request to the API endpoint with the headers
    return this.http.get(this.API_URL, { headers });
  }

  getStudentById(id: number) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a GET request to the API endpoint with the headers
    return this.http.get(`${this.API_URL}/${id}`, { headers });
  }

  createStudent(student: any) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a POST request to the API endpoint with the headers
    return this.http.post(this.API_URL, student, { headers });
  }

  updateStudent(student: any) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a PUT request to the API endpoint with the headers
    return this.http.put(`${this.API_URL}/${student.id}`, student, { headers });
  }

  deleteStudent(id: string) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a DELETE request to the API endpoint with the headers
    return this.http.delete(`${this.API_URL}/${id}`, { headers });
  }

}
