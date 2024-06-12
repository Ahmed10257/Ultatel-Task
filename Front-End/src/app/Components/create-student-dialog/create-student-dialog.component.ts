import { StudentsService } from './../../Services/students.service';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-student-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
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

  AddStudentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  student: { name: string, age: number, email: string } = { name: '', age: 0, email: '' };

  onSubmit() {
    if (this.AddStudentForm.valid) {
      this.student.name = this.AddStudentForm.value.name ?? '';

      const currentDate = new Date();
      const birthDate = new Date(this.AddStudentForm.value.age ?? '');
      const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
      const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));

      this.student.age = ageInYears;
      this.student.email = this.AddStudentForm.value.email ?? '';
      this.studentsService.createStudent(this.AddStudentForm.value).subscribe((date) => {
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
