import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';

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
}
