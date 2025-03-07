import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import * as requestIp from 'request-ip';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) { }
  async create(@Req() req: Request, createDeviceDto: CreateDeviceDto) {
    const clientIp = requestIp.getClientIp(req);
    const userAgent = req.headers['user-agent'] || 'Unknow device';

    return this.prisma.device.create({
      data: {
        userId: createDeviceDto.userId,
        device_type: userAgent,
        device_name: createDeviceDto.device_name,
        ip_address: clientIp || '0.0.0.0',
        last_active: new Date()
      }
    });
  }

  async findAll() {
    return await this.prisma.device.findMany({ include: { user: true } });
  }

  async findOne(id: number) {
    const result = await this.prisma.device.findUnique({ where: { id } })

    if (!result)
      throw new NotFoundException("Device not found")

    return result;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return await this.prisma.device.update({ where: { id }, data: { ...updateDeviceDto } })
  }

  async remove(id: number) {
    return await this.prisma.device.delete({ where: { id } })
  }
}
