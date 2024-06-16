import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtiStudentCoursesDialogComponent } from './edti-student-courses-dialog.component';

describe('EdtiStudentCoursesDialogComponent', () => {
  let component: EdtiStudentCoursesDialogComponent;
  let fixture: ComponentFixture<EdtiStudentCoursesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdtiStudentCoursesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdtiStudentCoursesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
