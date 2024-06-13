import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '../../Services/Students/students.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-and-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './search-and-filter.component.html',
  styleUrls: ['./search-and-filter.component.css'],
  providers: [StudentsService]
})
export class SearchAndFilterComponent {
  constructor(private studentService: StudentsService, private http: HttpClient) { }

  searchForm = new FormGroup({
    searchByName: new FormControl(''),
    searchByAge: new FormControl(''),
    searchByGender: new FormControl(''),
    searchByCountry: new FormControl(''),
  });

  search() {
    this.studentService.search();
  }

  reset() {
    this.studentService.reset();
  }

}
