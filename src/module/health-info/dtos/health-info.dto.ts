import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateHealthInfoDto {
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Height must be a number' },
  )
  @ApiProperty({
    type: Number,
    description: 'Height of the user',
    example: 170,
  })
  height: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Weight must be a number' },
  )
  @ApiProperty({
    type: Number,
    description: 'Weight of the user',
    example: 70,
  })
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Age of the user',
    example: 25,
  })
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "selected activity level",
    example: "VERY_ACTIVE",
  })
  activity_level: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    description: 'selected allergies',
    example: ['Lactose', 'Gluten'],
  })
  allergies_name: string[];
}

