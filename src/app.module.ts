import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { GenreModule } from './genre/genre.module';
import { GenreImageModule } from './genre-image/genre-image.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { CategoryModule } from './category/category.module';
import { LanguageModule } from './language/language.module';
import { ProfileModule } from './profile/profile.module';
import { SearchHistoryModule } from './search-history/search-history.module';
import { DeviceModule } from './device/device.module';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { BillingHistoryModule } from './billing-history/billing-history.module';
import { ContentModule } from './content/content.module';
import { CategoryContentModule } from './category-content/category-content.module';
import { ContentGenreModule } from './content-genre/content-genre.module';
import { ContentAudioModule } from './content-audio/content-audio.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}), UserModule, PrismaModule, AuthModule, AdminModule, GenreModule, GenreImageModule, PaymentMethodModule, CategoryModule, LanguageModule, ProfileModule, SearchHistoryModule, DeviceModule, SubscriptionPlanModule, SubscriptionModule, BillingHistoryModule, ContentModule, CategoryContentModule, ContentGenreModule, ContentAudioModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
