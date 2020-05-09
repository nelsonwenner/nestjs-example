import { UserEntity } from './../../database/entities/user.entity';
import { Module, Global } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { RepositoryService } from './repository.service';

@Global()
@Module({ 
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ], 
  providers: [
    RepositoryService
  ],
  exports: [
    RepositoryService
  ]
})

export class RepositoryModule {}
