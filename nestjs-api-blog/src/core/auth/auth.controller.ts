import { AuthService } from './auth.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { RegisterDTO, LoginDTO } from '../../database/models/user.dto';

@Controller('users')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post()
  async register(@Body(ValidationPipe) credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }
  
  @Post('/login')
  async login(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
