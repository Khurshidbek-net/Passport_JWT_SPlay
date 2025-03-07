import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentGenreDto } from './dto/create-content-genre.dto';
import { UpdateContentGenreDto } from './dto/update-content-genre.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentGenreService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createContentGenreDto: CreateContentGenreDto) {
    return await this.prisma.contentGenre.create({ data: createContentGenreDto })
  }

  async findAll() {
    return await this.prisma.contentGenre.findMany({ include: { Content: true, Genre: true } })
  }

  async findOne(id: number) {
    const result = await this.prisma.contentGenre.findUnique({ where: { id } })
    if (!result)
      throw new NotFoundException('Not found')

    return result;
  }

  async update(id: number, updateContentGenreDto: UpdateContentGenreDto) {
    return await this.prisma.contentGenre.update({ where: { id }, data: { ...updateContentGenreDto } })
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.prisma.contentGenre.delete({ where: { id } })
  }
}
