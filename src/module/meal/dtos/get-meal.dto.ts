import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { MealFilter } from './meal.dto';
import { Type } from 'class-transformer';

export class GetMealsQueryDto {
  @IsOptional()
  @IsEnum(MealFilter)
  filterBy: MealFilter = MealFilter.DAILY; // Default to 'daily' if not provided

  @IsOptional()
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @Type(() => Number)
  offset: number = 0;
}
