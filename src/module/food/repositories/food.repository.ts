import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/db/prisma/prisma.service';

@Injectable()
export class FoodRepository {
  constructor(private prisma: PrismaService) {}

  async getFoodById(id: string) {
    return this.prisma.food.findUnique({
      where: {
        id,
      },
      include: {
        food_macronutrient: true,
        food_micronutrient: true,
        allergens: true,
      },
    });
  }

  async getFoodByName(name: string) {
    return this.prisma.food.findUnique({
      where: {
        name,
      },
      include: {
        food_macronutrient: true,
        food_micronutrient: true,
        allergens: true,
      },
    });
  }

  async createFood(food: Prisma.FoodUncheckedCreateInput) {
    try {
      return this.prisma.food.create({
        data: food,
      });
    } catch (error) {
      console.log(error);
    }
   
  }
}
