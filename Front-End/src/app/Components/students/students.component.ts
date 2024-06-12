import { Component } from '@angular/core';
import { StudentsService } from '../../Services/students.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, TableModule, FontAwesomeModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
  providers: [StudentsService]
})

export class StudentsComponent implements OnInit {
  constructor(private studentService: StudentsService, private router: Router,) { }

  students: any;



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

  editStudent(student: any) {
    console.log('Edit Student: ', student);

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



}
