import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GradesService } from '../../Services/grades/grades.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-edit-grade-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-grade-dialog.component.html',
  styleUrl: './edit-grade-dialog.component.css'
})
export class EditGradeDialogComponent {

  constructor(private gradeService: GradesService, private dialog: MatDialog, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { }

  grade = this.data.gradeFromHome;
  gradeValid: boolean = true;
  totalValid: boolean = true;


  EditGradeForm: any;

  ngOnInit() {
    this.EditGradeForm = new FormGroup({
      grade: new FormControl(this.grade.grade, [Validators.required, Validators.min(0), Validators.max(100)]),
    });
  }

  onSubmit() {
    this.gradeValid = this.EditGradeForm.controls['grade'].valid;
    this.grade = this.EditGradeForm.controls['grade'].value;

    if (
      this.gradeValid &&
      this.totalValid
    ) {
      this.gradeService.editGrade(this.grade.id, this.grade).subscribe((data) => {
        Swal.fire('Grade Edited Successfully', '', 'success');
        this.dialog.closeAll();
        this.router.navigateByUrl('/grades');
      });
    }
  }

}
