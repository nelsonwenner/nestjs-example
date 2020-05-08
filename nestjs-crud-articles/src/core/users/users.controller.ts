import { Controller, Get, Post, Req, Request, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }
    
    @Post()
    async store(@Req() request: Request) {
        return await this.userService.create(request.body as any);
    }

    @Get()
    async index() {
        return await this.userService.listAll();
    }
}
