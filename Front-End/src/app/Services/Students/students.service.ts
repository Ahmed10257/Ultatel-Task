import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private API_URL = 'http://localhost:3000/students';

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
    return this.http.get(`${this.API_URL}/${id}`);
  }

  createStudent(student: any) {
    return this.http.post(this.API_URL, student);
  }

  updateStudent(student: any) {
    return this.http.put(`${this.API_URL}/${student.id}`, student);
  }

  deleteStudent(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}
