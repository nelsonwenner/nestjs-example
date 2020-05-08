import { Ideas } from './../../database/models/ideas.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class RepositoryService {

    public constructor(
        @InjectRepository(Ideas) public ideasRepository: Repository<Ideas>,
    ) {}
}
