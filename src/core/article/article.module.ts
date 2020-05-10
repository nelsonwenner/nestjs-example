import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';


@Module({
  imports: [AuthModule],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
