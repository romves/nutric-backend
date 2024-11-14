import { Module } from '@nestjs/common';
import { GeminiModule } from '../gemini/gemini.module';
import { HealthInfoModule } from '../health-info/health-info.module';
import { FoodController } from './controllers/food.controller';
import { FoodRepository } from './repositories/food.repository';
import { FoodService } from './services/food.service';
import { NutrientService } from './services/nutrient.service';

@Module({
  providers: [NutrientService, FoodService, FoodRepository],
  controllers: [FoodController],
  imports: [HealthInfoModule, GeminiModule],
})
export class FoodModule {}
