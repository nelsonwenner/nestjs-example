import { RepositoryModule } from './core/repository/repository.module';
import { ArticleModule } from './core/article/article.module';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import * as ormOptions from './config/ormconfig';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';


@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepositoryModule, 
    AuthModule,
    UserModule,
    ArticleModule
  ],
  providers: [],
})

export class AppModule { }
