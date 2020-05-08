import { Comments } from './../../database/models/comments.entity';
import { Users } from './../../database/models/users.entity';
import { Ideas } from './../../database/models/ideas.entity';
import { Module, Global } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { RepositoryService } from './repository.service';

@Global()
@Module({ 
    imports: [
        TypeOrmModule.forFeature([Ideas, Users, Comments]),
    ], 
    providers: [
        RepositoryService
    ],
    exports: [
        RepositoryService
    ]
})

export class RepositoryModule {}
