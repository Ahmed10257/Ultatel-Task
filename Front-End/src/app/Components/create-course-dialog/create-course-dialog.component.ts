import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../Services/courses/courses.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-course-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-course-dialog.component.html',
  styleUrl: './create-course-dialog.component.css'
})
export class CreateCourseDialogComponent {

  constructor(private courseService: CoursesService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<any>) { this.course = {} }

  courseNameValid: boolean = true;
  courseGradeValid: boolean = true;
  course: any;



  AddCourseForm = new FormGroup({
    courseName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    courseGrade: new FormControl('', Validators.required),
  });


  onSubmit() {
    this.courseNameValid = this.AddCourseForm.controls['courseName'].valid;
    this.courseGradeValid = this.AddCourseForm.controls['courseGrade'].valid;

    this.course.courseName = this.AddCourseForm.controls['courseName'].value;
    this.course.courseGrade = this.AddCourseForm.controls['courseGrade'].value;

    if (this.courseNameValid && this.courseGradeValid) {

      this.courseService.createCourse(this.course).subscribe((data) => {
        console.log(data);
        this.dialog.close();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Course Added successfully',
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
