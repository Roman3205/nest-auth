import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class EditBookmarkDto {
  @IsString()
  @Length(2, 200)
  @IsOptional()
  title?: string;

  @IsString()
  @Length(2, 800)
  @IsOptional()
  description?: string;

  @IsUrl({ protocols: ['https'] })
  @Length(7, 200)
  @IsOptional()
  link?: string;
}
