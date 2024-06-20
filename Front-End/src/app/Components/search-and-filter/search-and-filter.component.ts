import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '../../Services/Students/students.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-search-and-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './search-and-filter.component.html',
  styleUrls: ['./search-and-filter.component.css'],
  providers: [StudentsService]
})
export class SearchAndFilterComponent implements OnInit {
  constructor(private studentService: StudentsService) { }

  searchForm = new FormGroup({
    searchByName: new FormControl(''),
    searchByLowerAge: new FormControl(''),
    searchByUpperAge: new FormControl(''),
    searchByGender: new FormControl(''),
    searchByCountry: new FormControl(''),
  });

  students: any;

  @Output() inputEvent = new EventEmitter<any>();

  ngOnInit() {
    this.studentService.getStudents().subscribe((data: any) => {
      this.students = data;
      this.sendStudents();
    },
      (error: any) => {
        console.error(error);
      });
    this.sendStudents();
  }

  sendStudents() {
    this.inputEvent.emit(this.students);
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



  search() {
    const searchByName = this.searchForm.controls.searchByName.value || '';
    const searchByLowerAge = Number(this.searchForm.controls.searchByLowerAge.value) || 0;
    const searchByUpperAge = Number(this.searchForm.controls.searchByUpperAge.value) || 0;
    const searchByGender = this.searchForm.controls.searchByGender.value || '';
    const searchByCountry = this.searchForm.controls.searchByCountry.value || '';

    this.studentService.searchStudents(searchByName, searchByLowerAge, searchByUpperAge, searchByGender, searchByCountry).subscribe((data: any) => {
      this.students = data;
      this.sendStudents();
    },
      (error: any) => {
        console.error(error);
      });
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
