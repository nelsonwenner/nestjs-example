import { ArticleEntity } from '../../database/entities/article.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { RepositoryService } from './repository.service';
import { Module, Global } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";


@Global()
@Module({ 
  imports: [
    TypeOrmModule.forFeature([UserEntity, ArticleEntity]),
  ], 
  providers: [
    RepositoryService
  ],
  exports: [
    RepositoryService
  ]
})

export class RepositoryModule {}
