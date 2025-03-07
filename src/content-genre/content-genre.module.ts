import { Module } from '@nestjs/common';
import { ContentGenreService } from './content-genre.service';
import { ContentGenreController } from './content-genre.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContentGenreController],
  providers: [ContentGenreService],
})
export class ContentGenreModule {}
