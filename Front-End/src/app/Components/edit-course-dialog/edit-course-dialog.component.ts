import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CoursesService } from '../../Services/courses/courses.service';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-course-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.css'
})
export class EditCourseDialogComponent {
  constructor(private courseService: CoursesService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<any>,
    private router: Router) { }

  courseNameValid: boolean = true;
  courseGradeValid: boolean = true;

  EditCourseForm: any;
  course = this.data.courseFromHome;

  ngOnInit() {
    this.EditCourseForm = new FormGroup({
      courseName: new FormControl(this.course.courseName, [Validators.required, Validators.minLength(3)]),
      courseGrade: new FormControl(this.course.courseGrade, Validators.required),
    });
  }


  onSubmit() {
    this.courseNameValid = this.EditCourseForm.controls['courseName'].valid;
    this.courseGradeValid = this.EditCourseForm.controls['courseGrade'].valid;

    this.course.courseName = this.EditCourseForm.controls['courseName'].value;
    this.course.courseGrade = this.EditCourseForm.controls['courseGrade'].value;

    if (this.courseNameValid && this.courseGradeValid) {
      this.courseService.editCourse(this.course).subscribe((data) => {
        console.log(data);
        this.dialog.close();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Course updated successfully',
          showConfirmButton: true,
        });
      }), (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          showConfirmButton: true,
        });
      }
    }
  }

}
