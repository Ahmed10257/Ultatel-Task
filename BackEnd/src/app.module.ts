import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { Student } from './students/entities/student.entity';
import { User } from './users/entities/user.entity';
import { Course } from './courses/entities/course.entity';
import { CoursesModule } from './courses/courses.module';
import { GradesModule } from './grades/grades.module';
import { Grade } from './grades/entities/grade.entity';

require('dotenv').config({
  path: __dirname + '/../.env',
});

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Student, User, Course, Grade],
    synchronize: true,
  }),
    AuthModule,
    UsersModule,
    StudentsModule,
    CoursesModule,
    GradesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }



