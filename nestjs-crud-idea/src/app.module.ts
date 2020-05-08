import { HttpErrorFilter } from './core/shared/http.error.filter';
import { IdeasModule } from './core/ideias/ideas.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositoryModule } from './core/repository/repository.module';
import * as ormOptions from './config/ormconfig';
import { APP_FILTER } from '@nestjs/core';
import { UsersModule } from './core/users/users.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepositoryModule,
    IdeasModule,
    UsersModule
  ],
  providers: [
    {
        provide: APP_FILTER,
        useClass: HttpErrorFilter
    }
  ]
})

export class AppModule { }
