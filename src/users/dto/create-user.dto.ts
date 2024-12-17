import { IsEmail, IsString, IsNumber, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  @Min(18)
  age: number;
}
