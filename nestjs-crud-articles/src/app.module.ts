import { Module } from '@nestjs/common';
import { UsersModule } from './core/users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositoryModule } from './core/repository/repository.module';
import { ArticlesModule } from './core/articles/articles.module';
import * as ormOptions from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    UsersModule, 
    RepositoryModule, 
    ArticlesModule
  ],
  providers: [],
})

export class AppModule { }
