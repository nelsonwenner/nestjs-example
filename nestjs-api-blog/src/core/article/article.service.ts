import { FindAllQuery, FindFeedQuery, CreateArticleDTO, UpdateArticleDTO } from '../../database/models/article.dto';
import { ArticleEntity } from '../../database/entities/article.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { RepositoryService } from '../repository/repository.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Like } from 'typeorm/find-options/operator/Like';


@Injectable()
export class ArticleService {

  constructor(private repoRepository: RepositoryService) {}

  async findBySlug(slug : string) {
    return await this.repoRepository.articleRepository.findOne({
      where: { slug: slug },
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

  async findAll(user: UserEntity, query: FindAllQuery) {
    let findOptions: any = {where: {}};

    if (query.author) {
      const user = await this.repoRepository.userRepository.findOne({where: {username: query.author}});
      findOptions.where.author = user;
    }
    if (query.tag) {
      findOptions.where.tagList = Like(`%${query.tag}%`);
    }
    if (query.offset) {
      findOptions.skip = query.offset;
    }
    if (query.limit) {
      findOptions.take = query.limit;
    }
    return await this.repoRepository.articleRepository.find(findOptions);
  }

  async findFeed(user: UserEntity, query: FindFeedQuery) {
    const { followers } = await this.repoRepository.userRepository.findOne({
      where: { id: user.id },
      relations: ['followers'],
    });
    const findOptions = {
      ...query,
      where: followers.map(follow => ({ author: follow.id })),
    };
    return (await this.repoRepository.articleRepository.find(findOptions)).map(article => article.toArticle(user));
  }

  async favoriteArticle(slug: string, user: UserEntity) {
    const article = await this.findBySlug(slug);
    article.favoritesBy.push(user);
    await this.repoRepository.articleRepository.save(article);
    return (await this.findBySlug(slug)).toArticle(user);
  }

  async unfavoriteArticle(slug: string, user: UserEntity) {
    const article = await this.findBySlug(slug);
    article.favoritesBy = article.favoritesBy.filter(fav => fav.id !== user.id);
    await this.repoRepository.articleRepository.save(article);
    return (await this.findBySlug(slug)).toArticle(user);
  }
}


