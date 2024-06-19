import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';



/* the controller is responsible for handling incoming requests and returning responses to the client
and it's protected by the AuthGuard */
@UseGuards(AuthGuard)
@ApiTags('grades')
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) { }

  @Post(':studentId/courses/:courseId')
  @ApiOperation({ summary: 'Add a grade to a student for a course' })
  @ApiParam({ name: 'studentId', description: 'ID of the student' })
  @ApiParam({ name: 'courseId', description: 'ID of the course' })
  @ApiBody({ schema: { example: { grade: 90 } }, description: 'The grade to be added' })
  @ApiResponse({ status: 201, description: 'Grade added successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async addGradeToStudent(
    @Param('studentId') studentId: number,
    @Param('courseId') courseId: number,
    @Body('grade') grade: number,
  ): Promise<Grade> {
    return this.gradesService.addGradeToStudent(studentId, courseId, grade);
  }

  @Get()
  @ApiOperation({ summary: 'Get all grades' })
  @ApiResponse({ status: 200, description: 'Grades fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Grades not found.' })
  findAll() {
    return this.gradesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a grade by ID' })
  @ApiParam({ name: 'id', description: 'ID of the grade' })
  @ApiResponse({ status: 200, description: 'Grade fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Grade not found.' })
  findOne(@Param('id') id: string) {
    return this.gradesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a grade by ID' })
  @ApiParam({ name: 'id', description: 'ID of the grade' })
  @ApiResponse({ status: 200, description: 'Grade updated successfully.' })
  @ApiResponse({ status: 404, description: 'Grade not found.' })
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(+id, updateGradeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a grade by ID' })
  @ApiParam({ name: 'id', description: 'ID of the grade' })
  @ApiResponse({ status: 200, description: 'Grade deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Grade not found.' })
  remove(@Param('id') id: string) {
    return this.gradesService.remove(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new grade' })
  @ApiResponse({ status: 201, description: 'The grade has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get('student/:id')
  @ApiOperation({ summary: 'Get all grades for a student' })
  @ApiParam({ name: 'id', description: 'ID of the student' })
  @ApiResponse({ status: 200, description: 'Student grades fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Student grades not found.' })
  getStudentGrades(@Param('id') id: string) {
    return this.gradesService.getStudentGrades(+id);
  }

}
