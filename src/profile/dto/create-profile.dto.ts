export class CreateProfileDto {
  name: string;
  user_id: number;
  avatar?: string;
  language_id?: number;
  age?: number;
  password: string;
  is_main?: boolean;
}
