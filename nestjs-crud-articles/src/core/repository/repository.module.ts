import { Articles } from './../../database/models/articles.entity';
import { Module, Global } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Users } from '../../database/models/users.entity';
import { RepositoryService } from './repository.service';

@Global()
@Module({ 
    imports: [
        TypeOrmModule.forFeature([Users, Articles]),
    ], 
    providers: [
        RepositoryService
    ],
    exports: [
        RepositoryService
    ]
})

export class RepositoryModule {}
