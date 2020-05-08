import { UserDTO } from './users.dto';
import { UsersService } from './users.service';
import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';

@Controller('api/v1/users')
export class UsersController {

    constructor(private usersService: UsersService) {}
    
    @Get()
    @UseGuards(new AuthGuard())
    showAll() {
        return this.usersService.showAll();
    }

    @Post('auth')
    auth(@Body() data: UserDTO) {
        return this.usersService.auth(data);
    }

    @Post()
    register(@Body() data: UserDTO) {
        return this.usersService.register(data);
    }

}
