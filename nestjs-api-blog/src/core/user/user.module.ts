import { ProfileController } from './profile.controller';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [
    UserController, ProfileController
  ],
  providers: [
    UserService
  ]
})

export class UserModule {}
