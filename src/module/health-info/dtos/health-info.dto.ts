import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Gender } from './daily-target.dto';

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHTLY_ACTIVE = 'lightly active',
  MODERATELY_ACTIVE = 'moderately active',
  VERY_ACTIVE = 'very active',
}

export class CreateHealthInfoDto {
  @IsEnum(Gender, { message: 'Gender must be one of: male, female' })
  @ApiProperty({
    type: String,
    enum: Gender,
    description: 'Gender of the user',
    example: 'male',
  })
  gender: Gender;

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
  @IsEnum(ActivityLevel, {
    message:
      'Activity level must be one of: sedentary, lightly active, moderately active, very active',
  })
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    enum: ActivityLevel,
    description: "selected activity level",
    example: "very active",
  })
  activity_level: ActivityLevel;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    description: 'selected allergies',
    example: ['Lactose', 'Gluten'],
  })
  allergies_name: string[];
}

