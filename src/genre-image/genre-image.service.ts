import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreImageDto } from './dto/create-genre-image.dto';
import { UpdateGenreImageDto } from './dto/update-genre-image.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenreImageService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createGenreImageDto: CreateGenreImageDto) {
    return await this.prisma.genreImage.create({
      data: createGenreImageDto
    })
  }

  async findAll() {
    return await this.prisma.genreImage.findMany()
  }

  async findOne(id: number) {
    const result = await this.prisma.genreImage.findUnique({ where: { id } });

    if (!result)
      throw new NotFoundException("Image not found")

    return result;
  }

  async update(id: number, updateGenreImageDto: UpdateGenreImageDto) {
    return await this.prisma.genreImage.update({ where: { id }, data: { ...updateGenreImageDto } })
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.genreImage.delete({ where: { id } })
  }
}
