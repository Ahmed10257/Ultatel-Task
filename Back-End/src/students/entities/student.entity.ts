import { Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Entity } from "typeorm";
import { Grade } from "../../grades/entities/grade.entity";


@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 100 })
    email: string;

    @Column({
        type: "enum",
        enum: ["male", "female"],
        default: "male",
    })
    gender: string;

    @Column()
    birthDate: Date;

    @Column()
    country: string;

    @OneToMany(() => Grade, (grade) => grade.student)
    grades: Grade[];

}
