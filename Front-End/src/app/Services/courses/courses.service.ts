import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  private API_URL = 'https://ultatel-task-production-6661.up.railway.app//courses';

  getCourses() {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a GET request to the API endpoint with the headers
    return this.http.get(this.API_URL, { headers });
  }

  getCourseById(id: number) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a GET request to the API endpoint with the headers
    return this.http.get(`${this.API_URL}/${id}`, { headers });
  }

  createCourse(course: any) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a POST request to the API endpoint with the headers
    return this.http.post(this.API_URL, course, { headers });
  }

  editCourse(course: any) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a PUT request to the API endpoint with the headers
    return this.http.put(`${this.API_URL}/${course.id}`, course, { headers });
  }

  deleteCourse(id: string) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a DELETE request to the API endpoint with the headers
    return this.http.delete(`${this.API_URL}/${id}`, { headers });
  }

  getCoursesNames() {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a GET request to the API endpoint with the headers
    return this.http.get(`${this.API_URL}/names`, { headers });
  }

}
