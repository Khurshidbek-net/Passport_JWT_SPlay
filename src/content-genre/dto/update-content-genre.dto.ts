import { PartialType } from '@nestjs/mapped-types';
import { CreateContentGenreDto } from './create-content-genre.dto';

export class UpdateContentGenreDto extends PartialType(CreateContentGenreDto) {}
