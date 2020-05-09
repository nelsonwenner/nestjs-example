import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { RepositoryService } from './../repository/repository.service';
import { LoginDTO } from './../../database/models/user.dto';
import { RegisterDTO } from '../../database/models/user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(private repoService: RepositoryService,
              private jwtService: JwtService) {}

  async register(data: RegisterDTO) {
    try {
      const user = await this.repoService.userRepository.create(data);
      await this.repoService.userRepository.save(user);
      return {user: {...user.toResponseObject()}};
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  
  async login({email, password}: LoginDTO) {
    try {
      const user = await this.repoService.userRepository.findOne({where: {email: email}});
      if (user && await user.comparePassword(password)) { 
        const payload = {id: user.id, username: user.username, email: user.email};
        const token = this.jwtService.sign(payload);
        await this.repoService.userRepository.save(user);
        return {user: {...user.toResponseObject(), token: token}};
      }
      throw new UnauthorizedException('Invalid Credentials')
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
