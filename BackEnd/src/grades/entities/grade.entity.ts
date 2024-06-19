import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.grades, { eager: true, onDelete: 'CASCADE' })
    student: Student;

    @ManyToOne(() => Course, (course) => course.grades, { eager: true, onDelete: 'CASCADE' })
    course: Course;

    @Column()
    grade: number;
}