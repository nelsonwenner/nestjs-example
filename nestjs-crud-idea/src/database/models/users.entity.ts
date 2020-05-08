import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';


@Entity({name: 'users'})
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
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
    
    toResponseObject(showToken: boolean = true) {
        const { id, name, email, token, created_at } = this;
        const responseObject = { id, name, email, created_at }
        if (showToken) {
            responseObject['token'] = token
        }
        return responseObject;
    }

    private get token() {
        const { id, name } = this;
        return jwt.sign(
            {
                id,
                name,
            },
            process.env.SECRET,
            { expiresIn: '1d' },
        )
    }
}
