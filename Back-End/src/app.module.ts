
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { Student } from './students/entities/student.entity';
import { User } from './users/entities/user.entity';
import { Course } from './courses/entities/course.entity';
import { CoursesModule } from './courses/courses.module';
import { GradesModule } from './grades/grades.module';
import { Grade } from './grades/entities/grade.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    database: 'Ultatel_Task',
    port: 3306,
    username: 'root',
    password: '',
    entities: [Student, User, Course, Grade],
    synchronize: false,
  }), AuthModule, UsersModule, StudentsModule, CoursesModule, GradesModule],

  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
