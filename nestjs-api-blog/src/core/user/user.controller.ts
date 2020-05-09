import { Controller, Get, UseGuards, Put, Body } from '@nestjs/common';
import { UserEntity } from '../../database/entities/user.entity';
import { UpdateUserDTO } from '../../database/models/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.decorator';


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
