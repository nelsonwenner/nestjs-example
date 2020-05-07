import { Controller, Get } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';


@Controller('users')
export class UsersController {

    constructor(private readonly repositoryService: RepositoryService) { }

    @Get()
    async getCountUser(): Promise<string> {
        return `Total user are ${await this.repositoryService.userRepository.count()}`;
    }
}
