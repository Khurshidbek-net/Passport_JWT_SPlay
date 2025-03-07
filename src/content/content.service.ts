import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createContentDto: CreateContentDto) {
    return await this.prisma.content.create({ data: createContentDto })
  }

  async findAll() {
    return await this.prisma.content.findMany({include: {categoryContents: true, contentGenres: true, audion: true}});
  }

  async findOne(id: number) {
    const result = await this.prisma.content.findUnique({ where: { id } })
    if (!result)
      throw new NotFoundException('Not found')

    return result;
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    return await this.prisma.content.update({ where: { id }, data: { ...updateContentDto } })
  }

  async remove(id: number) {
    return await this.prisma.content.delete({ where: { id } })
  }
}
