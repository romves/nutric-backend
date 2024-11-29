import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MealService } from '../services/meal.service';
import { AddMealDto } from '../dtos/add-meal.dto';
import { User } from '../../../common/decorators/user/user.decorator';
import { User as TUser } from '@prisma/client';
import { JwtAuthGuard } from '../../../module/auth/guards/auth.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GetMealsQueryDto } from '../dtos/get-meal.dto';
import { MealFilter } from '../dtos/meal.dto';

@Controller('meal')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MealController {
  constructor(private mealService: MealService) {}

  @Post()
  addMeal(@Body() addMealDto: AddMealDto, @User() user: TUser) {
    return this.mealService.addMeal(addMealDto, user);
  }

  @Get()
  @ApiQuery({
    name: 'filterBy',
    enum: MealFilter,
    required: false,
    example: 'daily',
  })
  @ApiQuery({ name: 'limit', type: Number, required: false, default: 10 })
  @ApiQuery({ name: 'offset', type: Number, required: false, default: 0 })
  getUserMeal(@User() user: TUser, @Query() query: GetMealsQueryDto) {
    return this.mealService.getMeals(user, query);
  }

  @Delete('/:mealId')
  deleteMeal(@User() user: TUser, @Param('mealId') mealId: string) {
    return this.mealService.deleteMeal(mealId, user);
  }
}
