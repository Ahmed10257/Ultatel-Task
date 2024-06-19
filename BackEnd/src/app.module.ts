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
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Student, User, Course, Grade],
        synchronize: false,
      }

      ),

      inject: [ConfigService],
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



