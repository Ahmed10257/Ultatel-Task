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
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GradesService } from '../../Services/grades/grades.service';
import { EditGradeDialogComponent } from '../edit-grade-dialog/edit-grade-dialog.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToolbarModule, InputTextModule, InputTextareaModule, CommonModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, CommonModule, FormsModule, ToastModule, ConfirmDialogModule],

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
    console.log(grade, total);

    return (+grade / +total) * 100;
  }

  editGrade(id: any) {
    this.gradeService.getGradeById(id).subscribe((data) => {
      const grade = data;
      const dialogRef = this.dialog.open(EditGradeDialogComponent, {
        data: { gradeFromHome: grade },
        width: '450px',
        height: '600px'
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
}
