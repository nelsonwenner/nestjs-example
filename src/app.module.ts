import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositoryModule } from './repository/repository.module';
import { PostsModule } from './posts/posts.module';
import * as ormOptions from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    UsersModule, 
    RepositoryModule, 
    PostsModule
  ],
})

export class AppModule { }
