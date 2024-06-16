import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  private API_URL = 'http://localhost:3000/courses';

  getCourses() {
    return this.http.get(this.API_URL);
  }

  getCourseById(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  createCourse(course: any) {
    return this.http.post(this.API_URL, course);
  }

  editCourse(course: any) {
    return this.http.put(`${this.API_URL}/${course.id}`, course);
  }

  deleteCourse(id: string) {
    console.log(id);

    return this.http.delete(`${this.API_URL}/${id}`);
  }

  getCoursesNames() {
    return this.http.get(`${this.API_URL}/names`);
  }

}
