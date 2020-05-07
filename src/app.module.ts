import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from './users/users.model';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: "postgres",
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [
            Users
        ],
        synchronize: true,
        logging: true
    }),
        AppModule, 
        UsersModule
    ],
})

export class AppModule { }
