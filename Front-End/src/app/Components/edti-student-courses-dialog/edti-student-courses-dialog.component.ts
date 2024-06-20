import { CoursesService } from './../../Services/courses/courses.service';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { GradesService } from '../../Services/grades/grades.service';
import { StudentsService } from '../../Services/Students/students.service';
import { DropdownModule } from 'primeng/dropdown';
import Swal from 'sweetalert2';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-edti-student-courses-dialog',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule, ListboxModule],
  templateUrl: './edti-student-courses-dialog.component.html',
  styleUrl: './edti-student-courses-dialog.component.css'
})
export class EdtiStudentCoursesDialogComponent implements OnInit {

  students: any;
  courses: any;
  assignCourseForm: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogref: MatDialogRef<any>, private courseService: CoursesService, private gradeService: GradesService, private studentService: StudentsService) {


  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });

    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      this.students = this.students.map((student: any) => ({
        ...student,
        displayName: `${student.firstName} ${student.lastName}` // Combining firstName and lastName into displayName
      }));
    });

    this.assignCourseForm = new FormGroup({
      course: new FormControl('', Validators.required),
      student: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required)
    });
  }

  assignCourse() {
    const courseId = this.assignCourseForm.controls['course'].value.id;
    const studentId = this.assignCourseForm.controls['student'].value.id;
    const grade = this.assignCourseForm.controls['grade'].value || 0;

    const courseData = {
      courseId: courseId,
      studentId: studentId,
      grade: grade
    };

    this.gradeService.createGrade(courseData).subscribe((data) => {
      this.dialogref.close();
      Swal.fire({
        icon: 'success',
        title: 'Course Added Successfully',
        showConfirmButton: true,
      })
    }), (error: any) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        showConfirmButton: true,
      })
    }
  }


}
