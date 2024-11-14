import { Injectable } from '@nestjs/common';
import { PredictFoodDto } from '../dtos/predict-food.dto';
import { PromptService } from 'src/module/gemini/services/prompt.service';
import { NutritionPrompt } from '../constants/prompt';
import { HealthInfoService } from 'src/module/health-info/services/health-info.service';
import { Food, Prisma, User } from '@prisma/client';
import {
  AllergenCheckDto,
  FoodInfoDto,
  MacronutrientsDto,
  MicronutrientsDto,
} from '../dtos/nutrients-response.dto';
import { FoodRepository } from '../repositories/food.repository';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class FoodService {
  constructor(
    private readonly promptService: PromptService,
    private readonly healthInfoService: HealthInfoService,
    private readonly foodRepository: FoodRepository,
  ) {}

  async predictFoodName(foodImage: Express.Multer.File) {
    const prompt = NutritionPrompt.generateFoodNamePrompt();
    const foodName = await this.promptService.generateResponseByPromptAndImage(
      prompt,
      foodImage,
    );
    return { foodName };
  }

  async predictNutrition(predictFoodDto: PredictFoodDto, user: User) {
    const allergies = await this.getUserAllergies(user);
    const prompt = this.generatePrompt(predictFoodDto.foodName, allergies);
    const nutrition_result =
      await this.promptService.generateResponseByPrompt(prompt);
    const foodInfoDto = this.parseNutritionResult(nutrition_result);

    return this.getOrCreateFood(predictFoodDto, foodInfoDto);
  }

  private async getUserAllergies(user: User): Promise<string[]> {
    const userHealthInfo = await this.healthInfoService.getHealthInfo(user);
    return userHealthInfo.allergies.map((allergy) => allergy.name);
  }

  private generatePrompt(foodName: string, allergies: string[]): string {
    return NutritionPrompt.generateNutrientPrompt(foodName, allergies);
  }

  private parseNutritionResult(nutritionResult: string): FoodInfoDto {
    const parsedResult = JSON.parse(nutritionResult);
    const foodInfoDto = new FoodInfoDto();

    if (parsedResult.macronutrients) {
      const macronutrientsDto = new MacronutrientsDto();
      Object.assign(macronutrientsDto, parsedResult.macronutrients);
      foodInfoDto.macronutrients = macronutrientsDto;
    }

    if (parsedResult.micronutrients) {
      const micronutrientsDto = new MicronutrientsDto();
      Object.assign(micronutrientsDto, parsedResult.micronutrients);
      foodInfoDto.micronutrients = micronutrientsDto;
    }

    if (parsedResult.allergen_check) {
      const allergenCheckDto = new AllergenCheckDto();
      Object.assign(allergenCheckDto, parsedResult.allergen_check);
      foodInfoDto.allergen_check = allergenCheckDto;
    }

    return foodInfoDto;
  }

  private async getOrCreateFood(
    predictFoodDto: PredictFoodDto,
    foodInfoDto: FoodInfoDto,
  ): Promise<Food> {
    const foodExist = await this.foodRepository.getFoodByName(
      predictFoodDto.foodName,
    );
    if (foodExist) return foodExist;

    const newFood: Prisma.FoodUncheckedCreateInput = {
      id: createId(),
      name: predictFoodDto.foodName,
      category: 'uncategorized',
      food_macronutrient: { create: { ...foodInfoDto.macronutrients } },
      food_micronutrient: { create: { ...foodInfoDto.micronutrients } },
      allergens: {
        connect: foodInfoDto.allergen_check.allergens_found.map((allergen) => ({
          name: allergen,
        })),
      },
    };

    console.log(newFood);

    return this.foodRepository.createFood(newFood);
  }
}
