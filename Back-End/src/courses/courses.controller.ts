import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { UseGuards } from '@nestjs/common';

/* the controller is responsible for handling incoming requests and returning responses to the client
and it's protected by the AuthGuard */
@UseGuards(AuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Get('name/:courseName')
  async findByName(@Param('courseName') courseName: string): Promise<Course> {
    try {
      const course = await this.coursesService.findOneByName(courseName);
      if (!course) {
        throw new NotFoundException(`Course with name ${courseName} not found`);
      }
      return course;
    } catch (error) {
      console.error('Error in controller findByName:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.coursesService.remove(+id);
  }
}
