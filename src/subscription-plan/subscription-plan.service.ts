import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionPlanService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return await this.prisma.subscriptionPlan.create({ data: createSubscriptionPlanDto })
  }

  async findAll() {
    return await this.prisma.subscriptionPlan.findMany({ include: { subscriptions: true } });
  }

  async findOne(id: number) {
    const result = await this.prisma.subscriptionPlan.findUnique({ where: { id } })
    if (!result)
      throw new NotFoundException('Plan not found')

    return result;
  }

  async update(id: number, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return await this.prisma.subscriptionPlan.update({ where: { id }, data: { ...CreateSubscriptionPlanDto } })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prisma.subscriptionPlan.delete({ where: { id } })
  }
}
