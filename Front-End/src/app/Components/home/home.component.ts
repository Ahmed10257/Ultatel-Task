import { Component } from '@angular/core';
import { StudentsComponent } from '../students/students.component';
import { SearchAndFilterComponent } from '../search-and-filter/search-and-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateStudentDialogComponent } from '../create-student-dialog/create-student-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StudentsComponent, SearchAndFilterComponent, ReactiveFormsModule, NgSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {

  constructor(private dialog: MatDialog) { }

  addStudent() {
    const dialog = this.dialog.open(CreateStudentDialogComponent, {
      width: '500px',
    });

  }

}
