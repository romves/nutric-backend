import { Module } from '@nestjs/common';
import { MealService } from './services/meal.service';

@Module({
  providers: [MealService]
})
export class MealModule {}
