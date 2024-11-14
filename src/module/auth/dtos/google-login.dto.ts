import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Google token',
    example: 'google-token',
  })
  token: string;
}