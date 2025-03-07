import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentGenreService } from './content-genre.service';
import { CreateContentGenreDto } from './dto/create-content-genre.dto';
import { UpdateContentGenreDto } from './dto/update-content-genre.dto';

@Controller('content-genre')
export class ContentGenreController {
  constructor(private readonly contentGenreService: ContentGenreService) {}

  @Post()
  create(@Body() createContentGenreDto: CreateContentGenreDto) {
    return this.contentGenreService.create(createContentGenreDto);
  }

  @Get()
  findAll() {
    return this.contentGenreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentGenreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentGenreDto: UpdateContentGenreDto) {
    return this.contentGenreService.update(+id, updateContentGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentGenreService.remove(+id);
  }
}
