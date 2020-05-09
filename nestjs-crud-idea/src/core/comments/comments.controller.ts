import { CommentsDTO } from './comments.dto';
import { CommentsService } from './comments.service';
import { Controller, Get, Param, Post, UseGuards, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../users/user.decorator';

@Controller('api/v1/comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {}

    @Get('idea/:id')
    showCommentsByIdea(@Param('id') idea: string) {

    }

    @Get('user/:id')
    showCommentsByUser(@Param('id') user: string) {
        return this.commentsService.showByUser(user);
    }

    @Post('/idea/:id')
    @UseGuards(new AuthGuard())
    storeComment(@Param('id') idea: string, @User('id') user: string, @Body() data: CommentsDTO) {
        console.log("\nChamou!!!")
        return this.commentsService.create(idea, user, data);
    }

    @Get(':id')
    showComment(@Param('id') id: string) {
        return this.commentsService.show(id);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyComment(@Param('id') id: string, @User('id') user: string) {
        return this.commentsService.destroy(id, user);
    }

}
