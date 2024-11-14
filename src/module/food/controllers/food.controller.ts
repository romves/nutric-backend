import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PredictFoodDto } from '../dtos/predict-food.dto';
import { FoodService } from '../services/food.service';
import { JwtAuthGuard } from 'src/module/auth/guards/auth.guard';
import { User } from 'src/common/decorators/user/user.decorator';
import { User as TUser } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('food')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post('predict-food')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        foodImage: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('foodImage'))
  predictFood(@UploadedFile() foodImage: Express.Multer.File) {
    return this.foodService.predictFoodName(foodImage);
  }

  @Post('predict-nutrition')
  @ApiBody({
    type: PredictFoodDto,
  })
  predictNutrition(
    @Body() predictFoodDto: PredictFoodDto,
    @User() user: TUser,
  ) {
    return this.foodService.predictNutrition(predictFoodDto, user);
  }
}
