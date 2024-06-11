/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";


/* eslint-disable prettier/prettier */
@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({
        type: "enum",
        enum: ["male", "female"],
        default: "male",
    })
    gender: string;

    @Column()
    birth_date: Date;

    @Column()
    country: string;

}
