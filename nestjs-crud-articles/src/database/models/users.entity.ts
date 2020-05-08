import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Articles } from './articles.entity';
import * as bcrypt from 'bcryptjs';


@Entity({name: 'users'})
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @CreateDateColumn({type: "timestamp"})
    update_at: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    
    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    /* Relations (1, N) */
    @OneToMany(() => Articles, article => article.user)
    articles: Articles[]
}
