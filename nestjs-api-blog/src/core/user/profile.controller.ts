import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('profiles')
export class ProfileController {
  
  constructor(private userService: UserService) {}

  @Get('/:username')
  async findProfile(@Param('email') email: string) {
    const user = await this.userService.findByUser(email);
    if (!user) {
      throw new NotFoundException();
    }
    return { profile: user };
  }
}