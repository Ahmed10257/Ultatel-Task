import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Column } from "typeorm";
import { Grade } from "../../grades/entities/grade.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    courseName: string;

    @Column()
    courseGrade: Number;

    @OneToMany(() => Grade, (grade) => grade.course, { cascade: true })
    grades: Grade[];
}
