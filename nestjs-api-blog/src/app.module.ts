import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositoryModule } from './core/repository/repository.module';
import * as ormOptions from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepositoryModule, 
    AuthModule,
    UserModule
  ],
  providers: [],
})

export class AppModule { }
