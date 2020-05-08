import { Comments } from './comments.entity';
import { Users } from './users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';


@Entity({name: 'ideas'})
export class Ideas {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string;

    @Column('text')
    description: string;

    @ManyToOne(type => Users, author => author.ideas)
    author: Users

    @ManyToMany(type => Users, {cascade: true})
    @JoinTable()
    likes: Users[];

    @ManyToMany(type => Users, {cascade: true})
    @JoinTable()
    dislikes: Users[];

    @OneToMany(type => Comments, comment => comment.idea)
    comments: Comments[];

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @CreateDateColumn({type: "timestamp"})
    update_at: Date;
}
