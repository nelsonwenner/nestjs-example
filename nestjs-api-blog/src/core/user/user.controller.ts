import { UpdateUserDTO } from './../../database/models/user.dto';
import { UserEntity } from './../../database/entities/user.entity';
import { UserService } from './user.service';
import { Controller, Get, UseGuards, Put, Body } from '@nestjs/common';
import { User } from '../auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}
  
  @Get()
  @UseGuards(AuthGuard())
  async findCurrentUser(@User() user: UserEntity) {
    return await this.userService.findByUser(user.username);
  }

  @Put()
  @UseGuards(AuthGuard())
  async update(@User() user: UserEntity, @Body() data: UpdateUserDTO) {
    return await this.userService.updateUser(user.username, data);
  }
}
