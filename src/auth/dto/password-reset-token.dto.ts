import { IsNotEmpty, IsEmail } from 'class-validator';

export class PasswordResetTokenDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}