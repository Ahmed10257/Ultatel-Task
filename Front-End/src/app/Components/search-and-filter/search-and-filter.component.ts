import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '../../Services/Students/students.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-search-and-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './search-and-filter.component.html',
  styleUrls: ['./search-and-filter.component.css'],
  providers: [StudentsService]
})
export class SearchAndFilterComponent implements OnInit {
  constructor(private studentService: StudentsService, private http: HttpClient) { }

  searchForm = new FormGroup({
    searchByName: new FormControl(''),
    searchByAge: new FormControl(''),
    searchByGender: new FormControl(''),
    searchByCountry: new FormControl(''),
  });

  students: any;

  @Output() inputEvent = new EventEmitter<any>();

  ngOnInit() {
    this.studentService.getStudents().subscribe((data: any) => {
      this.students = data;
      console.log(this.students);
      this.sendStudents();

    },
      (error: any) => {
        console.error(error);
      });
    this.sendStudents();
    console.log(this.students);

  }

  sendStudents() {
    this.inputEvent.emit(this.students);
    console.log(this.students);
  }



  search() {
    const searchByName = this.searchForm.controls.searchByName.value;
    const searchByAge = this.searchForm.controls.searchByAge.value;
    const searchByGender = this.searchForm.controls.searchByGender.value;
    const searchByCountry = this.searchForm.controls.searchByCountry.value;

    this.students = this.students.filter((student: any) => {
      let match = true;
      let fullName = student.firstName + " " + student.lastName;
      if (searchByName && fullName.toLowerCase().indexOf(searchByName.toLowerCase()) === -1) {
        match = false;
      }
      if (searchByAge && student.age !== searchByAge) {
        match = false;
      }
      if (searchByGender && student.gender.toLowerCase() !== searchByGender) {
        match = false;
      }
      if (searchByCountry && student.country.toLowerCase() !== searchByCountry.toLowerCase()) {
        match = false;
      }
      console.log(match);

      return match;
    });
    console.log(this.students);

    this.sendStudents();
  }

  reset() {
    this.studentService.getStudents().subscribe((data: any) => {
      this.students = data;
      this.sendStudents();
    },
      (error: any) => {
        console.error(error);
      });
  }
}
