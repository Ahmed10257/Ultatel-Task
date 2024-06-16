import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class CoursesService {

  constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) { }

  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  findOne(id: any): Promise<Course> {
    return this.courseRepository.findOne(id);
  }

  async findOneByName(courseName: string): Promise<Course> {
    try {
      const course = await this.courseRepository.findOne({ where: { courseName } });
      return course;
    } catch (error) {
      console.error('Error finding course by name:', error);
      throw new Error('Error finding course by name');
    }
  }


  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    await this.courseRepository.update(id, updateCourseDto)
    return this.courseRepository.findOneBy({ id });
  }

  async remove(id: any): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
