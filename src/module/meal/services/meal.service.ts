import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMealDto } from '../dtos/add-meal.dto';
import { Prisma, User } from '@prisma/client';
import { MealRepository } from '../repositories/meal.repository';
import { createId } from '@paralleldrive/cuid2';
import { GetMealsQueryDto } from '../dtos/get-meal.dto';
import { MealFilter } from '../dtos/meal.dto';

@Injectable()
export class MealService {
  constructor(private mealRepo: MealRepository) {}

  async addMeal(addMealDto: AddMealDto, user: User) {
    const meal: Prisma.MealLogUncheckedCreateInput = {
      id: createId(),
      user_id: user.id,
      food_id: addMealDto.foodId,
      serving_size: addMealDto.servingSize,
      serving_unit: addMealDto.servingUnit,
    };

    return this.mealRepo.addMeal(meal);
  }

  async getMeals(user: User, query: GetMealsQueryDto) {
    const { filterBy, limit, offset } = query;
    const { startDate, endDate } = this.filterByTimeline(filterBy);

    const meals: Prisma.MealLogFindManyArgs = {
      where: {
        user_id: user.id,
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        food: {
          include: {
            food_macronutrient: true,
            food_micronutrient: true,
            allergens: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: limit || 10,
      skip: offset || 0,
    };

    return this.mealRepo.getMealsByUserId(meals);
  }

  async updateMeal() {
    return 'update meal';
  }

  async deleteMeal(mealId: string, user: User) {
    const meal = await this.mealRepo.getMealById(mealId, user.id);

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    return this.mealRepo.deleteMeal(mealId);
  }

  private filterByTimeline(filter: MealFilter) {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    console.log(now.toLocaleString());

    switch (filter) {
      case 'weekly':
        startDate = new Date(now.setDate(now.getDate() - now.getDay())); // Start of the week
        endDate = new Date(now.setDate(now.getDate() + 6 - now.getDay())); // End of the week
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the month
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month
        break;
      case 'daily':
      default:
        startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of the day
        endDate = new Date(now.setHours(23, 59, 59, 999)); // End of the day
        break;
    }

    return {
      startDate,
      endDate,
    };
  }
}
