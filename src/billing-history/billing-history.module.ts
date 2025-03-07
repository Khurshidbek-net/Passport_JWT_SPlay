import { Module } from '@nestjs/common';
import { BillingHistoryService } from './billing-history.service';
import { BillingHistoryController } from './billing-history.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BillingHistoryController],
  providers: [BillingHistoryService],
})
export class BillingHistoryModule { }
