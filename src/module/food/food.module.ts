import { Module } from '@nestjs/common';
import { GeminiModule } from '../gemini/gemini.module';
import { HealthInfoModule } from '../health-info/health-info.module';
import { FoodController } from './controllers/food.controller';
import { FoodRepository } from './repositories/food.repository';
import { FoodService } from './services/food.service';
import { NutrientService } from './services/nutrient.service';
import { AllergyService } from '../allergy/services/allergy.service';
import { AllergyModule } from '../allergy/allergy.module';

@Module({
  providers: [NutrientService, FoodService, FoodRepository],
  controllers: [FoodController],
  imports: [HealthInfoModule, GeminiModule, AllergyModule],
})
export class FoodModule {}
