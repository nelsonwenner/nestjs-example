import { CreateArticleDTO, UpdateArticleDTO, FindAllQuery, FindFeedQuery  } from '../../database/models/article.dto';
import { Controller, Get, UseGuards, Param, Post, ValidationPipe, Body, Put, Delete, Query } from '@nestjs/common';
import { UserEntity } from '../../database/entities/user.entity';
import { OptionalAuthGuard } from '../auth/optional.auth.guard';
import { ArticleService } from './article.service';
import { User } from '../auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller('articles')
export class ArticleController {

  constructor(private articleService: ArticleService) {}

  @Get()
  @UseGuards(new OptionalAuthGuard())
  async findAll(@User() user: UserEntity, @Query() query: FindAllQuery) {
    const articles = await this.articleService.findAll(user, query);
    return { articles, articlesCount: articles.length };
  }

  @Get('/feed')
  @UseGuards(AuthGuard())
  async findFeed(@User() user: UserEntity, @Query() query: FindFeedQuery) {
    const articles = await this.articleService.findFeed(user, query);
    return { articles, articlesCount: articles.length };
  }

  @Get('/:slug')
  @UseGuards(new OptionalAuthGuard())
  async findBySlug(@Param('slug') slug: string, @User() user: UserEntity) {
    const article = await this.articleService.findBySlug(slug);
    return { article: article.toArticle(user) };
  }

  @Post()
  @UseGuards(AuthGuard())
  async createArticle(@User() user: UserEntity, @Body(ValidationPipe) data: CreateArticleDTO ) {
    const article = await this.articleService.createArticle(user, data);
    return { article };
  }

  @Put('/:slug')
  @UseGuards(AuthGuard())
  async updateArticle(@Param('slug') slug: string, @User() user: UserEntity, @Body(ValidationPipe) data: UpdateArticleDTO ) {
    const article = await this.articleService.updateArticle(slug, user, data);
    return { article };
  }

  @Delete('/:slug')
  @UseGuards(AuthGuard())
  async deleteArticle(@Param() slug: any, @User() user: UserEntity) {
    const article = await this.articleService.deleteArticle(slug, user);
    return { article };
  }

  @Post('/:slug/favorite')
  @UseGuards(AuthGuard())
  async favoriteArticle(@Param('slug') slug: any, @User() user: UserEntity) {
    const article = await this.articleService.favoriteArticle(slug, user);
    return { article };
  }

  @Delete('/:slug/unfavorite')
  @UseGuards(AuthGuard())
  async unfavoriteArticle(@Param('slug') slug: any, @User() user: UserEntity) {
    const article = await this.articleService.unfavoriteArticle(slug, user);
    return { article };
  }

}
