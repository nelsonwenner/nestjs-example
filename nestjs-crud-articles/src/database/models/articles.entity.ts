import { Entity, Column, ManyToOne, BeforeInsert, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Users } from './users.entity';
import * as slugify from 'slug';


@Entity({name: 'articles'})
export class Articles {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    slug: string;

    @Column('uuid', {name: 'user_id', nullable: false})
    userId: string;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    body: string;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @CreateDateColumn({type: "timestamp"})
    update_at: Date;
    
    @BeforeInsert()
    generateSlug() {
        this.slug = slugify(this.title, { lower: true }) + '-' +
        ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    }
    
    /* Relations (N, 1) */
    @ManyToOne(() => Users, user => user.articles)
    user: Users
}
