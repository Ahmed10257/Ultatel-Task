import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { Student } from '../students/entities/student.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }

  async addGradeToStudent(studentId: number, courseId: number, grade: number): Promise<Grade> {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new Error(`Student with id ${studentId} not found.`);
    }

    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new Error(`Course with id ${courseId} not found.`);
    }

    const newGrade = this.gradeRepository.create({
      student,
      course,
      grade,
    });

    return this.gradeRepository.save(newGrade);
  }
}
