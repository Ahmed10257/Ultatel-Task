import { Component } from '@angular/core';
import { StudentsService } from '../../Services/students.service';
import { OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-student-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-student-dialog.component.html',
  styleUrl: './edit-student-dialog.component.css',
  providers: [StudentsService]
})
export class EditStudentDialogComponent implements OnInit {

  constructor(private studentsService: StudentsService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<any>,
    private router: Router) { this.student = this.data.studentFromHome; }

  nameValid: boolean = true;
  birthDateValid: boolean = true;
  emailValid: boolean = true;
  genderValid: boolean = true;
  countryValid: boolean = true;

  student = this.data.studentFromHome;

  EditStudentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    birthDate: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.EditStudentForm = new FormGroup({
      name: new FormControl(this.student.name, [Validators.required, Validators.minLength(3)]),
      birthDate: new FormControl(this.student.birthDate, Validators.required),
      email: new FormControl(this.student.email, [Validators.required, Validators.email]),
      gender: new FormControl(this.student.gender, Validators.required),
      country: new FormControl(this.student.country, Validators.required),
    });
  }

  onSubmit() {
    this.nameValid = this.student.name.valid;
    this.birthDateValid = this.student.birthDate.valid;
    this.emailValid = this.student.email.valid;
    this.genderValid = this.student.gender.valid;
    this.countryValid = this.student.country.valid;

    console.log("XXXX");

    console.log(this.student);

  }

  updateStudent() {
    this.studentsService.updateStudent(this.student).subscribe((data) => {
      console.log(data);
    });
  }
}
