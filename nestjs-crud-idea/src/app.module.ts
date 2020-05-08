import { IdeasModule } from './core/ideias/ideas.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositoryModule } from './core/repository/repository.module';
import * as ormOptions from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepositoryModule,
    IdeasModule
  ],
  providers: [],
})

export class AppModule { }
