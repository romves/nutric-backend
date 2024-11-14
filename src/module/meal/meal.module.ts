import { Module } from '@nestjs/common';
import { MealService } from './services/meal.service';
import { MealController } from './controllers/meal.controller';
import { MealRepository } from './repositories/meal.repository';

@Module({
  providers: [MealService, MealRepository],
  controllers: [MealController]
})
export class MealModule {}
