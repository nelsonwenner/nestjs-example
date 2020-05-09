import { Comments } from './../../database/models/comments.entity';
import { CommentsDTO } from './comments.dto';
import { RepositoryService } from './../repository/repository.service';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class CommentsService {

    constructor(private repoService: RepositoryService) {}

    async show(id: string) {
        return await this.repoService.commetsRepository.find({
            where: {id},
            relations: ['author', 'idea']
        });
    }

    async showByUser(id: string) {
        const comment = await this.repoService.commetsRepository.find({
          where: { author: id },
          relations: ['author'],
        });
        return comment;
    }

    async create(ideaId: string, userId: string, data: CommentsDTO) {
        const idea = await this.repoService.ideasRepository.findOne({where: {id: ideaId}});
        const user = await this.repoService.usersRepository.findOne({where: {id: userId}});
        
        const comment = await this.repoService.commetsRepository.create({
            ...data,
            idea: idea,
            author: user
        });
        await this.repoService.commetsRepository.save(comment);
        return comment;
    }

    async destroy(id: string, userId: string) {
        const comment = await this.repoService.commetsRepository.findOne({
            where: { id },
            relations: ['author', 'idea'],
        });

        if (comment.author.id !== userId) {
            throw new HttpException('You do not own this comment', HttpStatus.UNAUTHORIZED);
        }

        await this.repoService.commetsRepository.remove(comment);
        return { deleted: true }
    }


}
