import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private http: HttpClient) { }

  private API_URL = 'http://localhost:3000/grades';

  getGrades() {
    return this.http.get(this.API_URL);
  }

  getGradeById(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  editGrade(grade: any) {
    return this.http.put(`${this.API_URL}/${grade.id}`, grade);
  }

  deleteGrade(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  createGrade(courseData: any) {
    return this.http.post(`${this.API_URL}/${courseData.studentId}/courses/${courseData.courseId}`, courseData);
  }

  getStudentGrades(id: number) {
    return this.http.get(`${this.API_URL}/student/${id}`);
  }
}
