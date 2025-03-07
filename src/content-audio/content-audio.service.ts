import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentAudioDto } from './dto/create-content-audio.dto';
import { UpdateContentAudioDto } from './dto/update-content-audio.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentAudioService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createContentAudioDto: CreateContentAudioDto) {
    return this.prisma.contentAudio.create({ data: createContentAudioDto })
  }

  async findAll() {
    return await this.prisma.contentAudio.findMany({ include: { Content: true } })
  }

  async findOne(id: number) {
    const result = await this.prisma.contentAudio.findUnique({ where: { id } })
    if (!result)
      throw new NotFoundException('Not found')

    return result;
  }

  async update(id: number, updateContentAudioDto: UpdateContentAudioDto) {
    return await this.prisma.contentAudio.update({ where: { id }, data: { ...updateContentAudioDto } })
  }

  async remove(id: number) {
    return await this.prisma.contentAudio.delete({ where: { id } })
  }
}
