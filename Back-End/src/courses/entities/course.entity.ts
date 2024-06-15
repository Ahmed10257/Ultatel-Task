import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    courseName: string;

    @Column()
    courseGrade: Number;
}
