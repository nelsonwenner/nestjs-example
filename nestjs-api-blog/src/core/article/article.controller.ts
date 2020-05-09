import { CreateArticleDTO, UpdateArticleDTO } from './../../database/models/article.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './../auth/user.decorator';
import { UserEntity } from './../../database/entities/user.entity';
import { OptionalAuthGuard } from './../auth/optional.auth.guard';
import { ArticleService } from './article.service';
import { Controller, Get, UseGuards, Param, Post, ValidationPipe, Body, Put, Delete } from '@nestjs/common';

@Controller('articles')
export class ArticleController {

  constructor(private articleService: ArticleService) {}

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

}
