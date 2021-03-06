import { RepositoryService } from './../repository/repository.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayload } from './../../database/models/user.dto';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(private repoRepository: RepositoryService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: process.env.MY_SECRET
    });
  }
  
  async validate(payload: AuthPayload) {
    const { username } = payload;
    const user = this.repoRepository.userRepository.find({where: {username: username}});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}