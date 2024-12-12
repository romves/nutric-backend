import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Title of the article',
    example: 'How to make a burger',
  })
  title: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Content of the article',
    example: 'This is a detailed guide on how to make a burger',
  })
  content: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Author of the article',
    example: 'John Doe',
  })
  author: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    type: String,
    description: 'URL of the image',
    example: 'https://example.com/image.jpg',
  })
  imageUrl?: string;
}
