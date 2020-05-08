import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Exclude, classToPlain } from 'class-transformer';
import { Articles } from './articles.entity';
import * as bcrypt from 'bcryptjs';


@Entity({name: 'users'})
export class Users extends AbstractEntity {

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    @Exclude()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    
    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    /* Relations (1, N) */
    @OneToMany(() => Articles, article => article.user, { cascade: true })
    articles: Articles[]
}
