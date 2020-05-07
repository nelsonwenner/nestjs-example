import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './shared/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Users } from './users.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService
    ]
})

export class UsersModule {}
