import { Module } from '@nestjs/common';
import { NutrientService } from './services/nutrient.service';
import { FoodService } from './services/food.service';

@Module({
  providers: [NutrientService, FoodService]
})
export class FoodModule {}
