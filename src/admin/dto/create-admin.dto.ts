export class CreateAdminDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isCreator: boolean;
  confirm_password: string;
}
