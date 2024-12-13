import { Module } from '@nestjs/common';
import { PrismaModule } from './common/db/prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { GeminiModule } from './module/gemini/gemini.module';
import { FoodModule } from './module/food/food.module';
import { MealModule } from './module/meal/meal.module';
import { HealthInfoModule } from './module/health-info/health-info.module';
import { ConfigModule } from '@nestjs/config';
import { AllergyModule } from './module/allergy/allergy.module';
import { ArticleModule } from './module/article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule,
    GeminiModule,
    FoodModule,
    MealModule,
    HealthInfoModule,
    AllergyModule,
    ArticleModule,
  ],
})
export class AppModule {}
