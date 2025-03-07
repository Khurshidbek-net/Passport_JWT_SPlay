import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return await this.prisma.subscription.create({ data: createSubscriptionDto })
  }

  async findAll() {
    return await this.prisma.subscription.findMany({ include: { SubscriptionPlan: true } })
  }

  async findOne(id: number) {
    const result = await this.prisma.subscription.findUnique({ where: { id } })
    if (!result)
      throw new NotFoundException('Subscription not found')

    return result;
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return await this.prisma.subscription.update({ where: { id }, data: { ...updateSubscriptionDto } })
  }


  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.subscription.delete({ where: { id } })
  }
}
