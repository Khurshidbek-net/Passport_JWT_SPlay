import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillingHistoryDto } from './dto/create-billing-history.dto';
import { UpdateBillingHistoryDto } from './dto/update-billing-history.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillingHistoryService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createBillingHistoryDto: CreateBillingHistoryDto) {
    return await this.prisma.billingHistory.create({ data: createBillingHistoryDto })
  }

  async findAll() {
    return await this.prisma.billingHistory.findMany({ include: { paymentMethod: true, user: true, subscription: true } })
  }

  async findOne(id: number) {
    const result = await this.prisma.billingHistory.findUnique({ where: { id }, include: { subscription: true, user: true, paymentMethod: true } },)


    if (!result)
      throw new NotFoundException('Not found')

    return result;
  }

  async update(id: number, updateBillingHistoryDto: UpdateBillingHistoryDto) {
    return await this.prisma.billingHistory.update({ where: { id }, data: { ...updateBillingHistoryDto } })
  }

  async remove(id: number) {
    return await this.prisma.billingHistory.delete({ where: { id } })
  }
}
