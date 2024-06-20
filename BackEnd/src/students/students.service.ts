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
    await this.studentRepository.update(id, updateStudentDto)
    return this.studentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }

  calculateBirthDate(age: number): Date {
    const today = new Date();
    return new Date(today.getFullYear() - age, today.getMonth(), today.getDate());
  }

  async search(search: string, fromAge: number, toAge: number, gender: string, country: string): Promise<Student[]> {
    return this.studentRepository.createQueryBuilder('student')
      .where('student.firstName LIKE :search OR student.email LIKE :search', { search: `%${search}%` })
      .andWhere('student.birthDate >= :fromAge', { fromAge: this.calculateBirthDate(fromAge) })
      .andWhere('student.birthDate <= :toAge', { toAge: this.calculateBirthDate(toAge) })
      .andWhere('student.gender= :gender', { gender })
      .andWhere('student.country = :country', { country })
      .getMany();
  }
}
