import { Controller, Get, Post, Req, Request, Param, NotFoundException } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';


@Controller('users')
export class UsersController {

    constructor(private readonly repositoryService: RepositoryService) { }
    
    @Post()
    async store(@Req() request: Request) {
        const user = this.repositoryService.userRepository.create(request.body as any);
        return await this.repositoryService.userRepository.save(user);
    }

    @Get()
    async index() {
        return this.repositoryService.userRepository.find({
            order: {
                created_at: 'DESC'
            }
        })
    }
}
