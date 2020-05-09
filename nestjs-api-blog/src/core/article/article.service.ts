import { ArticleEntity } from './../../database/entities/article.entity';
import { CreateArticleDTO, UpdateArticleDTO } from './../../database/models/article.dto';
import { UserEntity } from './../../database/entities/user.entity';
import { RepositoryService } from './../repository/repository.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ArticleService {

  constructor(private repoRepository: RepositoryService) {}

  async findBySlug(slug: string) {
    return await this.repoRepository.articleRepository.findOne({
      where: { slug },
    });
  }

  private ensureOwnership(user: UserEntity, article: ArticleEntity): boolean {
    
    return article.author.id === user.id;
  }

  async createArticle(user: UserEntity, data: CreateArticleDTO) {
    const article = await this.repoRepository.articleRepository.create(data);
    article.author = user;
    const { slug } = await this.repoRepository.articleRepository.save(article);
    return (await this.repoRepository.articleRepository.findOne({ slug })).toArticle(user);
  }

  async updateArticle(slug: string, user: UserEntity, data: UpdateArticleDTO) {
    const article = await this.findBySlug(slug);
    if (!this.ensureOwnership(user, article)) {
      throw new UnauthorizedException();
    }
    await this.repoRepository.articleRepository.update({ slug }, data);
    return article.toArticle(user);
  }

  async deleteArticle({ slug }: any, user: UserEntity) {
    const article = await this.repoRepository.articleRepository.findOne({where: {slug: slug}});
    if (!this.ensureOwnership(user, article)) {
      throw new UnauthorizedException();
    }
    await this.repoRepository.articleRepository.remove(article);
  }

}
