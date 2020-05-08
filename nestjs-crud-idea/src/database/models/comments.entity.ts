import { Ideas } from './ideas.entity';
import { Users } from './users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinTable } from 'typeorm';


@Entity({name: 'comments'})
export class Comments {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    comment: string;

    @ManyToOne(type => Users)
    @JoinTable()
    author: Users;

    @ManyToOne(type => Ideas, idea => idea.comments)
    idea: Ideas;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @CreateDateColumn({type: "timestamp"})
    update_at: Date;
}
