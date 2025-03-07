import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createProfileDto: CreateProfileDto) {
    const { password, ...rest } = createProfileDto;
    const hashedPassword = await bcrypt.hash(password, 11);

    const user = await this.prisma.profile.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findAll() {
    return this.prisma.profile.findMany({
      include: { user: true, language: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.profile.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Profile not found`);
    }
    return user;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.prisma.profile.update({ where: { id }, data: { ...updateProfileDto } })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prisma.profile.delete({
      where: { id },
    });
  }
}
