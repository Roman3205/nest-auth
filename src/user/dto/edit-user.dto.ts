import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @Length(2, 200)
  @IsOptional()
  email?: string;

  @IsString()
  @Length(2, 100)
  @IsOptional()
  firstName?: string;

  @IsString()
  @Length(2, 100)
  @IsOptional()
  lastName?: string;
}
