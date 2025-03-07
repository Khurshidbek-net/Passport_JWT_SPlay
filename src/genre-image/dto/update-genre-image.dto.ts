import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreImageDto } from './create-genre-image.dto';

export class UpdateGenreImageDto extends PartialType(CreateGenreImageDto) {}
