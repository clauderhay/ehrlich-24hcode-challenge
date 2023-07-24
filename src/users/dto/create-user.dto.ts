import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
  })
  password: string;
}