import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class SignUpDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsBoolean()
  isAdmin: boolean;
}
