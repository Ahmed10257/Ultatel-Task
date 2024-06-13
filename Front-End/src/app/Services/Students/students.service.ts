import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private API_URL = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get(this.API_URL);
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
