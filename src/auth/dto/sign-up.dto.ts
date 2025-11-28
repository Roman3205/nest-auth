import { IsOptional, IsString, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class SignUpDto extends LoginDto {
  @IsString()
  @IsOptional()
  @Length(2, 50)
  fisrtName?: string;

  @IsString()
  @IsOptional()
  @Length(2, 100)
  lastName?: string;
}
