import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import * as ormOptions from './database/config/config';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
        AppModule, 
        UsersModule
    ],
})

export class AppModule { }
