import { IdeaDTO } from './indea.dto';
import { IdeasService } from './ideas.service';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';


@Controller('api/v1/ideas')
export class IdeasController {

    constructor(private readonly ideasService: IdeasService) { }
    
    @Get()
    index() {
        return this.ideasService.showAll();
    }

    @Post()
    store(@Body() data: IdeaDTO) {
        return this.ideasService.create(data);
    }

    @Get(':id')
    show(@Param('id') id: string) {
        return this.ideasService.read(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
        return this.ideasService.update(id, data);
    }

    @Delete(':id')
    destroy(@Param('id') id: string) {
        return this.ideasService.destroy(id);
    }
}
