import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity({name: 'users'})
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @CreateDateColumn({type: "timestamp"})
    update_at: Date;
}
