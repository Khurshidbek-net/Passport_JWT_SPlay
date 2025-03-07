import { PartialType } from '@nestjs/mapped-types';
import { CreateContentAudioDto } from './create-content-audio.dto';

export class UpdateContentAudioDto extends PartialType(CreateContentAudioDto) {}
