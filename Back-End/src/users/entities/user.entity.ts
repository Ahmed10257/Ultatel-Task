import { Optional, Options } from "@nestjs/common";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
