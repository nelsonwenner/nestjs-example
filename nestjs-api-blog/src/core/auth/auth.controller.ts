import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { RegisterDTO, LoginDTO } from '../../database/models/user.dto';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';


@Controller('users')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post()
  @ApiBody({ type: RegisterDTO })
  async register(@Body(ValidationPipe) credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }
  
  @Post('/login')
  @ApiBody({ type:  LoginDTO })
  async login(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
