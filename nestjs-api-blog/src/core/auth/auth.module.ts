import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.MY_SECRET,
      signOptions: {
        expiresIn: 3600
      }
    }),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService, 
    JwtStrategy
  ],
  exports: [
    PassportModule,
    JwtStrategy
  ]
})

export class AuthModule {}
