import { Users } from './../../database/models/users.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';


@Injectable()
export class UsersService {

    constructor(private readonly repoService: RepositoryService) {}

    async create(data: Users): Promise<Users> {
        const { email } = data;
        let user = await this.repoService.userRepository.findOne({where: {email: email}});
        if (user) { throw new HttpException('User already exists', HttpStatus.BAD_REQUEST); }
        user = this.repoService.userRepository.create(data);
        return await this.repoService.userRepository.save(user);
    }

    async listAll(): Promise<Users[]> {
        return await this.repoService.userRepository.find({
            order: {
                created_at: 'DESC'
            }
        })
    }
}