import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsNumber()
  @IsOptional()
  age: number;
}
