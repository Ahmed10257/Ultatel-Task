import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { StudentsModule } from '../students/students.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grade]), // Import the Grade entity
    StudentsModule, // Import the StudentsModule if you need to use Student entity
    CoursesModule, // Import the CoursesModule if you need to use Course entity
  ],
  providers: [GradesService], // Provide the GradesService
  controllers: [GradesController], // Provide the GradesController
  exports: [GradesService], // Export the GradesService if needed
})
export class GradesModule { }
