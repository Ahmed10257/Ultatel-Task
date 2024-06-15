import { Component, OnChanges } from '@angular/core';
import { StudentsService } from '../../Services/Students/students.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditStudentDialogComponent } from '../edit-student-dialog/edit-student-dialog.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';



@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, TableModule, FontAwesomeModule, ReactiveFormsModule, FormsModule, RippleModule, ButtonModule, ToastModule, ToolbarModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [StudentsService]
})

export class StudentsComponent implements OnChanges {
  constructor(private studentService: StudentsService, private dialog: MatDialog, private router: Router,
    private http: HttpClient) { }

  students: any;
  student: any;
  rows: number = 10;

  @Input() studentsFromHome: any;

  ngOnChanges(changes: SimpleChanges) {
    this.studentsFromHome = this.studentsFromHome;
  }

  // a method to calculate the age of the student based on the birthdate
  calculateAge(birthDate: any) {
    const today = new Date();
    const birthDate1 = new Date(birthDate);
    let age = today.getFullYear() - birthDate1.getFullYear();
    const m = today.getMonth() - birthDate1.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate1.getDate())) {
      age--;
    }
    return age;
  }

  // a method to open the dialog to edit the student
  editStudent(id: any) {
    this.studentService.getStudentById(id).subscribe((data) => {
      const student = data;
      const dialog = this.dialog.open(EditStudentDialogComponent, {
        width: '500px',
        data: {
          studentFromHome: student,
        },
      });
    });

  }

  // a method to delete the student
  deleteStudent(id: any) {
    this.studentService.deleteStudent(id).subscribe({
      next: (data) => {
        console.log(data);
        this.studentsFromHome = this.studentsFromHome.filter((student: any) => student.id !== id);

        Swal.fire({
          icon: 'success',
          title: 'Student Deleted Successfully',
        });
      },
      error: (error) => {
        console.error('There was an error!', error);

        Swal.fire({
          icon: 'error',
          title: 'Error Deleting Student',
          text: 'Please try again later.',
        });
      }
    });
  }

  // a method to change the number of rows displayed in the table
  onRowsChange() {
    console.log("f");
  }



}
