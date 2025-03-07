import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({ data: createGenreDto })
  }

  async findAll() {
    return await this.prisma.genre.findMany({ include: { images: true } })
  }

  async findOne(id: number) {
    const result = await this.prisma.genre.findUnique({ where: { id } })

    if (!result)
      throw new NotFoundException("Genre not found")

    return result;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    return await this.prisma.genre.update({ where: { id }, data: { ...updateGenreDto } })
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.genre.delete({ where: { id } });
  }
}
