import { ArticleEntity } from '../../database/entities/article.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';


@Injectable()
export class RepositoryService {

  public constructor(
    @InjectRepository(UserEntity) public userRepository: Repository<UserEntity>,
    @InjectRepository(ArticleEntity) public articleRepository: Repository<ArticleEntity>,
  ) {}
}
