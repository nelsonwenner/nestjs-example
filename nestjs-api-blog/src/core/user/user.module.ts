import { ProfileController } from './profile.controller';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';


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
