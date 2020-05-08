import { IdeaDTO } from './indea.dto';
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
        const idea = await this.repoService.ideasRepository.findOne({where: {id: id}});
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return idea;
    }

    async update(id: string, data: Partial<IdeaDTO>) {
        const idea = await this.repoService.ideasRepository.findOne({id});
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.repoService.ideasRepository.update({id}, data);
        return idea;
    }

    async destroy(id: string) {
        const idea = await this.repoService.ideasRepository.findOne({id});
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.repoService.ideasRepository.delete({id});
        return {deleted: true }
    }
}