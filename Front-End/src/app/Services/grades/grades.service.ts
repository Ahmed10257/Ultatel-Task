import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private http: HttpClient) { }

  private API_URL = 'https://ultatel-task-production-6661.up.railway.app//grades';

  getGrades() {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a GET request to the API endpoint with the headers
    return this.http.get(this.API_URL, { headers });
  }

  getGradeById(id: number) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a GET request to the API endpoint with the headers
    return this.http.get(`${this.API_URL}/${id}`, { headers });
  }

  editGrade(grade: any) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a PUT request to the API endpoint with the headers
    return this.http.put(`${this.API_URL}/${grade.id}`, grade, { headers });
  }

  deleteGrade(id: string) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a Delete request to the API endpoint with the headers
    return this.http.delete(`${this.API_URL}/${id}`, { headers });
  }

  createGrade(courseData: any) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a POST request to the API endpoint with the headers
    return this.http.post(`${this.API_URL}/${courseData.studentId}/courses/${courseData.courseId}`, courseData, { headers });
  }

  getStudentGrades(id: number) {
    // Get the token from the local storage
    const token = localStorage.getItem('UserToken');
    // Add the token to the headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send a GET request to the API endpoint with the headers
    return this.http.get(`${this.API_URL}/student/${id}`, { headers });
  }
}
