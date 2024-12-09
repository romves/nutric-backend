import {
  IsBoolean,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MacronutrientsDto {
  @IsNumber()
  calories: number;

  @IsNumber()
  protein: number;

  @IsNumber()
  fat: number;

  @IsNumber()
  carbohydrates: number;

  @IsNumber()
  fiber: number;

  @IsNumber()
  sugar: number;
}

export class MicronutrientsDto {
  @IsNumber()
  vitaminA: number;

  @IsNumber()
  vitaminC: number;

  @IsNumber()
  calcium: number;

  @IsNumber()
  iron: number;

  @IsNumber()
  magnesium: number;

  @IsNumber()
  potassium: number;

  @IsNumber()
  zinc: number;
}

export class AllergenCheckDto {
  @IsBoolean()
  contains_allergens: boolean;

  @IsArray()
  @IsString({ each: true })
  allergens_found: string[];
}

export class FoodInfoDto {
  @IsOptional()
  macronutrients: MacronutrientsDto;

  @IsOptional()
  micronutrients: MicronutrientsDto;

  @IsOptional()
  allergen_check: AllergenCheckDto;
}
