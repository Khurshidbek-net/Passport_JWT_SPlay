import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, ...rest } = createAdminDto;

    if (password !== confirm_password)
      throw new BadRequestException("Password mismatch!")

    const hashedPassword = await bcrypt.hash(password, 11);

    const admin = await this.prisma.admin.create({
      data: {
        ...rest, hashedPassword
      }
    })
    return admin;
  }

  async findAll() {
    return await this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`Admin not found`);
    }

    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.prisma.admin.update({ where: { id }, data: { ...updateAdminDto } })
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.admin.delete({ where: { id } })
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updateAdmin = await this.prisma.admin.update(
      {
        where: { id },
        data: { hashedToken: hashed_refresh_token }
      },
    );

    return updateAdmin;
  }

  async findAdminByEmail(email: string) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    return admin;
  }
}
