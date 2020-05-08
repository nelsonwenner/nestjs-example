import { IdeaDTO } from './indea.dto';
import { Ideas } from './../../database/models/ideas.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';


@Injectable()
export class IdeasService {

    constructor(private readonly repoService: RepositoryService) {}

    async showAll(): Promise<any> {
        return await this.repoService.ideasRepository.find();
    }

    async create(data: IdeaDTO): Promise<any> {
        const idea = await this.repoService.ideasRepository.create(data);
        return await this.repoService.ideasRepository.save(idea);
    }

    async read(id: string) {
        return await this.repoService.ideasRepository.findOne({where: {id: id}});
    }

    async update(id: string, data: Partial<IdeaDTO>) {
        await this.repoService.ideasRepository.update({id}, data);
        return await this.repoService.ideasRepository.findOne({id});
    }

    async destroy(id: string) {
        await this.repoService.ideasRepository.delete({id});
        return {deleted: true }
    }
}