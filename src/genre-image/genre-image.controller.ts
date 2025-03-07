import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenreImageService } from './genre-image.service';
import { CreateGenreImageDto } from './dto/create-genre-image.dto';
import { UpdateGenreImageDto } from './dto/update-genre-image.dto';

@Controller('genre-image')
export class GenreImageController {
  constructor(private readonly genreImageService: GenreImageService) {}

  @Post()
  create(@Body() createGenreImageDto: CreateGenreImageDto) {
    return this.genreImageService.create(createGenreImageDto);
  }

  @Get()
  findAll() {
    return this.genreImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreImageDto: UpdateGenreImageDto) {
    return this.genreImageService.update(+id, updateGenreImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreImageService.remove(+id);
  }
}
