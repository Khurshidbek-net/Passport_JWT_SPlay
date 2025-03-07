import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password, ...rest } = createUserDto;

    if (password !== confirm_password)
      throw new BadRequestException("Password mismatch!")

    const hashedPassword = await bcrypt.hash(password, 11);

    const user = await this.prisma.user.create({
      data: {
        ...rest,
        hashedPassword,
      },
    });
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({ include: { devices: true, profiles: true } })
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({ where: { id }, data: { ...updateUserDto } })
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.user.delete({ where: { id } })
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updateUser = await this.prisma.user.update(
      {
        where: { id },
        data: { hashedToken: hashed_refresh_token }
      },
    );

    return updateUser;
  }
}
