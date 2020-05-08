import { Articles } from './../../database/models/articles.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class ArticlesService {

    constructor(private readonly repoService: RepositoryService) {}

    async create(data: Articles): Promise<Articles> {
        const article = this.repoService.articleRepository.create(data);
        return await this.repoService.articleRepository.save(article);
    }
}
