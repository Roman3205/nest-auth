import { IsOptional, IsString, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class SignUpDto extends LoginDto {
  @IsString()
  @Length(2, 100)
  @IsOptional()
  fisrtName?: string;

  @IsString()
  @Length(2, 100)
  @IsOptional()
  lastName?: string;
}
