import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryContentDto } from './create-category-content.dto';

export class UpdateCategoryContentDto extends PartialType(CreateCategoryContentDto) {}
