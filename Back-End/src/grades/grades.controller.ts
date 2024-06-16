import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { UseGuards } from '@nestjs/common';



/* the controller is responsible for handling incoming requests and returning responses to the client
and it's protected by the AuthGuard */
@UseGuards(AuthGuard)
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) { }

  @Post(':studentId/courses/:courseId')
  async addGradeToStudent(
    @Param('studentId') studentId: number,
    @Param('courseId') courseId: number,
    @Body('grade') grade: number,
  ): Promise<Grade> {
    return this.gradesService.addGradeToStudent(studentId, courseId, grade);
  }

  @Get()
  findAll() {
    return this.gradesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(+id, updateGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradesService.remove(+id);
  }

  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get('student/:id')
  getStudentGrades(@Param('id') id: string) {
    return this.gradesService.getStudentGrades(+id);
  }

}
