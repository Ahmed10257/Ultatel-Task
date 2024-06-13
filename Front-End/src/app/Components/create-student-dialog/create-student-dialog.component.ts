import { StudentsService } from './../../Services/Students/students.service';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-student-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './create-student-dialog.component.html',
  styleUrl: './create-student-dialog.component.css',
  providers: [StudentsService]
})
export class CreateStudentDialogComponent {

  constructor(
    private studentsService: StudentsService,
    public dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) { }

  firstNameValid: boolean = true;
  lastNameValid: boolean = true;
  birthDateValid: boolean = true;
  emailValid: boolean = true;
  genderValid: boolean = true;
  countryValid: boolean = true;

  student: any;

  AddStudentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    birthDate: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', Validators.required),
    country: new FormControl('', [Validators.required]),
  });

  onSubmit() {

    this.firstNameValid = this.AddStudentForm.controls['firstName'].valid;
    this.lastNameValid = this.AddStudentForm.controls['lastName'].valid;
    this.birthDateValid = this.AddStudentForm.controls['birthDate'].valid;
    this.emailValid = this.AddStudentForm.controls['email'].valid;
    this.genderValid = this.AddStudentForm.controls['gender'].valid;
    this.countryValid = this.AddStudentForm.controls['country'].valid;

    console.log(this.AddStudentForm.controls['birthDate'].value);


    if (
      this.firstNameValid &&
      this.lastNameValid &&
      this.birthDateValid &&
      this.emailValid &&
      this.genderValid &&
      this.countryValid
    ) {
      this.student = {
        firstName: this.AddStudentForm.controls['firstName'].value,
        lastName: this.AddStudentForm.controls['lastName'].value,
        birthDate: this.AddStudentForm.controls['birthDate'].value,
        email: this.AddStudentForm.controls['email'].value,
        gender: this.AddStudentForm.controls['gender'].value,
        country: this.AddStudentForm.controls['country'].value,
      };
      console.log(this.student);

      this.studentsService.createStudent(this.student).subscribe((date) => {
        console.log(date);
        this.dialog.close();
        Swal.fire({
          icon: 'success',
          title: 'Student Added Successfully',
        }).then(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/home']);
            });
        });

      }, (error) => {
        console.error('There was an error!', error);
      }
      );

    } else {
      console.log(this.AddStudentForm.value);

      Swal.fire({
        icon: 'error',
        title: 'Please fill all the fields',
      });
    }
  }
}
