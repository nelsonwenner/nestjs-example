import { UserDTO } from './users.dto';
import { RepositoryService } from './../repository/repository.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {

    constructor(private repoService: RepositoryService) {}

    async showAll(): Promise<any> {
        const users = await this.repoService.usersRepository.find();
        return users.map(user => user.toResponseObject(false));
    }

    async auth(data: UserDTO) {
        const { email, password } = data;
        const user = await this.repoService.usersRepository.findOne({where: {email: email}});
        if (!user || (await user.comparePassword(password))) {
            throw new HttpException('Ivalide email/password', HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject();
    }

    async register(data: UserDTO) {
        const { email } = data;
        let user = await this.repoService.usersRepository.findOne({where: {email: email}});
        if (user) { throw new HttpException('User already exists', HttpStatus.BAD_REQUEST); }
        user = this.repoService.usersRepository.create(data);
        await this.repoService.usersRepository.save(user);
        return user.toResponseObject();
    }

}
