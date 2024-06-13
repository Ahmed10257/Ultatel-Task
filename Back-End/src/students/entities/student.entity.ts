import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";

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

}
