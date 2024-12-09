import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ActivityLevel } from './health-info.dto';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export class CreateDailyTargetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID of the user for whom the daily target is being set',
    example: 'user-1234',
  })
  user_id: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Daily calorie target',
    example: 2500,
  })
  calories: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Daily protein target (in grams)',
    example: 120,
  })
  protein: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Daily fat target (in grams)',
    example: 70,
  })
  fat: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Daily carbohydrates target (in grams)',
    example: 300,
  })
  carbohydrates: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Daily fiber target (in grams)',
    example: 30,
  })
  fiber: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Daily sugar target (in grams)',
    example: 25,
  })
  sugar: number;
}

export class CalculateDailyTargetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'ID of the user for whom the daily target is being set',
    example: 'user-1234',
  })
  user_id: string;

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
    description: 'selected activity level',
    example: 'VERY_ACTIVE',
  })
  activity_level: ActivityLevel;

  @IsEnum(Gender, { message: 'Gender must be one of: male, female' })
  @ApiProperty({
    type: String,
    enum: Gender,
    description: 'Gender of the user',
    example: 'male',
  })
  gender: Gender;
}