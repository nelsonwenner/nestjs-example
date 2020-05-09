import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './../../database/entities/user.entity';
import { User } from './../auth/user.decorator';
import { Controller, Get, Param, NotFoundException, Post, UseGuards, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('profiles')
export class ProfileController {

  constructor(private userService: UserService) {}

  @Get('/:username')
  async findProfile(@Param('username') username: string) {
    const user = await this.userService.findByUser(username);
    if (!user) {
      throw new NotFoundException();
    }
    return { profile: user };
  }

  @Post('/:username/follow')
  @UseGuards(AuthGuard())
  async followUser(@User() user: UserEntity,@Param('username') username: string) {
    const profile = await this.userService.followUser(user, username);
    return { profile };
  }

  @Delete('/:username/unfollow')
  @UseGuards(AuthGuard())
  async unfollowUser(@User() user: UserEntity, @Param('username') username: string) {
    const profile = await this.userService.unfollowUser(user, username);
    return { profile };
  }
}