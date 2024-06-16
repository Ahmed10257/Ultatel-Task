import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GradesService } from '../../Services/grades/grades.service';
import { EditGradeDialogComponent } from '../edit-grade-dialog/edit-grade-dialog.component';
import Swal from 'sweetalert2';
import { EdtiStudentCoursesDialogComponent } from '../edti-student-courses-dialog/edti-student-courses-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToolbarModule, InputTextModule, InputTextareaModule, CommonModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CommonModule, FormsModule, ToastModule, ConfirmDialogModule, ReactiveFormsModule],

  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css',
  providers: [GradesService]
})
export class GradesComponent implements OnInit {
  constructor(private gradeService: GradesService, private dialog: MatDialog, private router: Router) { }

  grades: any;
  grade: any

  ngOnInit() {
    this.gradeService.getGrades().subscribe((data) => {
      this.grades = data;
      console.log(this.grades);

    });
  }

  calculatePercentage(grade: number, total: number) {
    return ((+grade / +total) * 100).toFixed(2);
  }

  editGrade(id: any) {
    this.gradeService.getGradeById(id).subscribe((data) => {
      const grade = data;
      const dialogRef = this.dialog.open(EditGradeDialogComponent, {
        data: { gradeFromHome: grade },
        width: '450px',
        height: '600px'
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.gradeService.getGrades().subscribe((data) => {
          this.grades = data;
        });
      });
    }, (error) => {
      console.error('There was an error!', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error!',
      });
    });
  }

  addGrade() {
    const dialog = this.dialog.open(EdtiStudentCoursesDialogComponent, {
      width: '1200px',
      height: '600px',
      data: {
      },
    });
    dialog.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteGrade(id: any) {
    this.gradeService.deleteGrade(id).subscribe({
      next: (data) => {
        console.log(data);
        this.grades = this.grades.filter((grade: any) => grade.id !== id);

        Swal.fire({
          icon: 'success',
          title: 'Grade Deleted Successfully',
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error!',
        });
      }
    });
  }
}
