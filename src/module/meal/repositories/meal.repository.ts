import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/db/prisma/prisma.service';

@Injectable()
export class MealRepository {
  constructor(private prisma: PrismaService) {}

  async getMealById(id: string, userId: string) {
    return this.prisma.mealLog.findUnique({
      where: {
        id,
        user_id: userId,
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
    });
  }

  async getMealsByUserId(meals: Prisma.MealLogFindManyArgs) {
    return this.prisma.mealLog.findMany(meals);
  }

  async addMeal(meal: Prisma.MealLogUncheckedCreateInput) {
    return this.prisma.mealLog.create({
      data: meal,
    });
  }

  async updateMeal(mealId: string, meal: Prisma.MealLogUncheckedUpdateInput) {
    return this.prisma.mealLog.update({
      where: {
        id: mealId,
      },
      data: meal,
    });
  }

  async deleteMeal(mealId: string) {
    return this.prisma.mealLog.delete({
      where: {
        id: mealId,
      },
    });
  }
}
