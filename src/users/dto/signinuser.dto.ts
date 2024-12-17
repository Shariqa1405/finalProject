import { IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  signin: string;

  @IsString()
  password: string;
}
