import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { CoursesService } from '../../Services/courses/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { EditCourseDialogComponent } from '../../Components/edit-course-dialog/edit-course-dialog.component'
import { CreateCourseDialogComponent } from '../../Components/create-course-dialog/create-course-dialog.component'




@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToolbarModule, InputTextModule, InputTextareaModule, CommonModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CommonModule, FormsModule, ToastModule, ConfirmDialogModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  providers: [CoursesService, MessageService, ConfirmationService]
})
export class CoursesComponent implements OnInit {

  constructor(private courseService: CoursesService, private dialog: MatDialog, private router: Router) { }

  courses: any;
  course: any;
  rows: number = 10;
  searchTerm: string = '';
  @ViewChild('dt') dt: Table | undefined;

  ngOnInit() {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  filterCourses(value: string) {
    if (this.dt) {
      this.dt.filterGlobal(value, 'contains');
    }
  }

  AddCourse() {
    const dialogRef = this.dialog.open(CreateCourseDialogComponent, {
      data: { courseFromHome: this.course },
      width: '500px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editCourse(id: any) {
    this.courseService.getCourseById(id).subscribe((data) => {
      const course = data;
      const dialogRef = this.dialog.open(EditCourseDialogComponent, {
        data: { courseFromHome: course },
        width: '500px',
        height: '450px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  deleteCourse(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourse(id).subscribe({
          next: (data) => {
            this.courses = this.courses.filter((course: any) => course.id !== id);

            Swal.fire(
              'Deleted!',
              'Your course has been deleted.',
              'success'
            );
          },
          error: (error) => {
            console.error('There was an error!', error);

            Swal.fire({
              icon: 'error',
              title: 'Error Deleting Course',
              text: "There are Students enrolled in this course. You can't delete it.",
            });
          }
        });
      }
    });
  }

}


