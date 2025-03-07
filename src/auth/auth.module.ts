import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AdminAuthService } from './admin-auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports:[JwtModule.register({global: true}), UserModule, PrismaModule, AdminModule],
  controllers: [AuthController],
  providers: [UserAuthService, AdminAuthService],
})
export class AuthModule {}
