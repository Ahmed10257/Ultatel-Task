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

  editGrade(id: number, grade: any) {
    return this.http.put(`${this.API_URL}/${id}`, grade);
  }
}
