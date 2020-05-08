import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import { Module } from '@nestjs/common';


@Module({
    controllers: [
        IdeasController
    ],
    providers: [
        IdeasService
    ]
})

export class IdeasModule {}
