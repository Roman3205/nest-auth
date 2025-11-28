import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @Length(2, 200)
  @IsNotEmpty()
  title: string;

  @IsString()
  @Length(2, 800)
  @IsOptional()
  description?: string;

  @IsUrl({ protocols: ['https'] })
  @Length(7, 200)
  @IsNotEmpty()
  link: string;
}
