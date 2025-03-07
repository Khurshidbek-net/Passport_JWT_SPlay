import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryContentDto } from './dto/create-category-content.dto';
import { UpdateCategoryContentDto } from './dto/update-category-content.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryContentService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createCategoryContentDto: CreateCategoryContentDto) {
    return await this.prisma.categoryContent.create({ data: createCategoryContentDto })
  }

  async findAll() {
    return await this.prisma.categoryContent.findMany({ include: { category: true, content: true } })
  }

  async findOne(id: number) {
    const result = await this.prisma.categoryContent.findUnique({ where: { id } })
    if (!result)
      throw new NotFoundException('Not found')

    return result;
  }

  async update(id: number, updateCategoryContentDto: UpdateCategoryContentDto) {
    return await this.prisma.categoryContent.update({ where: { id }, data: { ...updateCategoryContentDto } })
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.prisma.categoryContent.delete({ where: { id } });
  }
}
