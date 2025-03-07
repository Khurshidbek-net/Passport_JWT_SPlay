import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LanguageService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createLanguageDto: CreateLanguageDto) {
    return this.prisma.language.create({
      data: createLanguageDto,
    });
  }

  async findAll() {
    return this.prisma.language.findMany();
  }

  async findOne(id: number) {
    return this.prisma.language.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return this.prisma.language.update({
      where: { id },
      data: updateLanguageDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.language.delete({
      where: { id },
    });
  }
}
