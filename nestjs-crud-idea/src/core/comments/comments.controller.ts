import { CommentsService } from './comments.service';
import { Controller } from '@nestjs/common';

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {}

    

}
