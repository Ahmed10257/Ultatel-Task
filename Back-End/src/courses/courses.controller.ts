import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

/* the controller is responsible for handling incoming requests and returning responses to the client
and it's protected by the AuthGuard */
@UseGuards(AuthGuard)
@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'The courses have been successfully fetched.' })
  @ApiResponse({ status: 404, description: 'Courses not found.' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiResponse({ status: 200, description: 'The course has been successfully fetched.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Get('name/:courseName')
  @ApiOperation({ summary: 'Get a course by title' })
  @ApiResponse({ status: 200, description: 'The course has been successfully fetched.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
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
  @ApiOperation({ summary: 'Update a course by ID' })
  @ApiResponse({ status: 200, description: 'The course has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course by ID' })
  @ApiResponse({ status: 200, description: 'The course has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  remove(@Param('id') id: any) {
    return this.coursesService.remove(+id);
  }
}
