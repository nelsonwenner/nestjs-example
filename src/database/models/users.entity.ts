import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Articles } from './articles.entity';
import * as bcrypt from 'bcryptjs';


@Entity({name: 'users'})
export class Users extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    name: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: false})
    password: string;

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
