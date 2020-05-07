import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath: '.env'
    }),
    AppModule, 
    UsersModule],
})
export class AppModule {}
