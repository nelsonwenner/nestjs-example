import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositoryModule } from './repository/repository.module';
import * as ormOptions from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    UsersModule, 
    RepositoryModule
  ],
})

export class AppModule { }
