import { Component } from '@angular/core';
import { StudentsService } from '../../Services/Students/students.service';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GradesService } from '../../Services/grades/grades.service';
import { MatDialog } from '@angular/material/dialog';
import { EdtiStudentCoursesDialogComponent } from '../edti-student-courses-dialog/edti-student-courses-dialog.component';


@Component({
  selector: 'app-edit-student-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-student-dialog.component.html',
  styleUrl: './edit-student-dialog.component.css',
  providers: [StudentsService]
})
export class EditStudentDialogComponent implements OnInit {

  constructor(private studentsService: StudentsService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogref: MatDialogRef<any>, private dialog: MatDialog,
    private router: Router, private gradeService: GradesService) { this.student = this.data.studentFromHome; }

  firstNameValid: boolean = true;
  lastNameValid: boolean = true;
  birthDateValid: boolean = true;
  emailValid: boolean = true;
  genderValid: boolean = true;
  countryValid: boolean = true;
  courses: any;

  student = this.data.studentFromHome;

  EditStudentForm: any;

  ngOnInit() {
    this.EditStudentForm = new FormGroup({
      firstName: new FormControl(this.student.firstName, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(this.student.lastName, [Validators.required, Validators.minLength(3)]),
      birthDate: new FormControl(this.formatDate(this.student.birthDate), Validators.required),
      email: new FormControl(this.student.email, [Validators.required, Validators.email]),
      gender: new FormControl(this.student.gender, Validators.required),
      country: new FormControl(this.student.country, Validators.required),
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  editCourses(id: any) {
    this.gradeService.getStudentGrades(id).subscribe((data) => {
      this.courses = data;
      this.courses = this.courses.map((course: any) => { course.name = course.courseName; return course; });
      const dialog = this.dialog.open(EdtiStudentCoursesDialogComponent, {
        width: '1200px',
        height: '600px',
        data: {
          studentCourses: this.courses,
          studentformDialog: this.student
        },
      });
    });
  }

  onSubmit() {
    this.firstNameValid = this.EditStudentForm.controls['firstName'].valid;
    this.lastNameValid = this.EditStudentForm.controls['lastName'].valid;
    this.birthDateValid = this.EditStudentForm.controls['birthDate'].valid;
    this.emailValid = this.EditStudentForm.controls['email'].valid;
    this.genderValid = this.EditStudentForm.controls['gender'].valid;
    this.countryValid = this.EditStudentForm.controls['country'].valid;

    if (
      this.firstNameValid &&
      this.lastNameValid &&
      this.birthDateValid &&
      this.emailValid &&
      this.genderValid &&
      this.countryValid
    ) {
      this.student = {
        id: this.student.id,
        firstName: this.EditStudentForm.controls['firstName'].value,
        lastName: this.EditStudentForm.controls['lastName'].value,
        birthDate: this.EditStudentForm.controls['birthDate'].value,
        email: this.EditStudentForm.controls['email'].value,
        gender: this.EditStudentForm.controls['gender'].value,
        country: this.EditStudentForm.controls['country'].value,
      };

      this.studentsService.updateStudent(this.student).subscribe((date) => {
        this.dialogref.close();
        Swal.fire({
          icon: 'success',
          title: 'Student Updated Successfully',
          showConfirmButton: true,
        })

      }, (error) => {
        console.error('There was an error!', error);
      }
      );

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill all the fields',
      });
    }
  }
}

