import { Controller, Get } from '@nestjs/common';
import { UsersService } from './shared/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Get()
    getUser(): string {
        return this.userService.getUser();
    }
}
