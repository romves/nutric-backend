
import { IsString, IsOptional } from 'class-validator';

  export class SearchArticleDto {
    @IsOptional()
    @IsString()
    term: string
  }