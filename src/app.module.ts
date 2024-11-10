import { Module } from '@nestjs/common';
import { PrismaModule } from './common/db/prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { GeminiModule } from './module/gemini/gemini.module';
import { FoodModule } from './module/food/food.module';
import { UserModule } from './module/user/user.module';
import { MealModule } from './module/meal/meal.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    GeminiModule,
    FoodModule,
    MealModule,
  ],
})
export class AppModule {}
