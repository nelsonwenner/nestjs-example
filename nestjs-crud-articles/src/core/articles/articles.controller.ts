import { ArticlesService } from './articles.service';
import { Controller, Get, Post, Req, Request, Param, NotFoundException } from '@nestjs/common';


@Controller('articles')
export class ArticlesController {

    constructor(private readonly articleService: ArticlesService) { }
    
    @Post()
    async store(@Req() request: Request) {
        return await this.articleService.create(request.body as any);
    }
}
