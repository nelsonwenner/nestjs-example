import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
  imports: [AuthModule],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
