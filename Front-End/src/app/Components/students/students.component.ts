import { Component } from '@angular/core';
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

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, TableModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
  providers: [StudentsService]
})

export class StudentsComponent implements OnInit {
  constructor(private studentService: StudentsService, private dialog: MatDialog, private router: Router,
    private http: HttpClient) { }

  students: any;
  student: any;
  rows: number = 10;

  ngOnInit() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        console.log('Data: ', data);

      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

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

  deleteStudent(id: any) {
    this.studentService.deleteStudent(id).subscribe({
      next: (data) => {
        console.log(data);
        this.students = this.students.filter((student: any) => student.id !== id);
        Swal.fire({
          icon: 'success',
          title: 'Student Deleted successfully',
        }).then(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/home']);
            });
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  onRowsChange() {
    console.log("f");
  }
}
