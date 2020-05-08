import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({name: 'ideas'})
export class Ideas {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string;

    @Column('text')
    description: string;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @CreateDateColumn({type: "timestamp"})
    update_at: Date;
}
