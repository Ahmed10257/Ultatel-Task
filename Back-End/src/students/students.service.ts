/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class StudentsService {

  constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) { }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create(createStudentDto);
    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      throw new BadRequestException('Failed to create student');
    }
  }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  findOne(id: number): Promise<Student | null> {
    return this.studentRepository.findOneBy({ id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student | null> {
    await this.studentRepository.update(id, updateStudentDto);
    return this.studentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
