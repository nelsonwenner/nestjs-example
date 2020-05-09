import { ArticleEntity } from './../../database/entities/article.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/entities/user.entity';


@Injectable()
export class RepositoryService {

  public constructor(
    @InjectRepository(UserEntity) public userRepository: Repository<UserEntity>,
    @InjectRepository(ArticleEntity) public articleRepository: Repository<ArticleEntity>,
  ) {}
}
