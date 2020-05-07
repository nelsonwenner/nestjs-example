import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../database/models/users.entity';


@Injectable()
export class RepositoryService {

    public constructor(
        @InjectRepository(Users) public userRepository: Repository<Users>
    ) {}
}
