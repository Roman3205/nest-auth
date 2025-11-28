import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Length(2, 200)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 300)
  @IsNotEmpty()
  password: string;
}
