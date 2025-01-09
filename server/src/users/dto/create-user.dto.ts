import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
