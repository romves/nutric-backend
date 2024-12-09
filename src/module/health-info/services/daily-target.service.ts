import { Injectable, NotFoundException } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { Prisma } from '@prisma/client';
import { DailyTargetCalculator } from 'src/common/helpers/calculator';
import {
    CalculateDailyTargetDto
} from '../dtos/daily-target.dto';
import { DailyTargetRepository } from '../repositories/daily-target.repository';

@Injectable()
export class DailyTargetService {
    constructor(private dailyTargetRepository: DailyTargetRepository) {}

  async createDailyTarget(calculateDailyTargetDto: CalculateDailyTargetDto) {
    const user_id = calculateDailyTargetDto.user_id
    const dailyTarget = DailyTargetCalculator.calculateDailyTarget(
      calculateDailyTargetDto.height,
      calculateDailyTargetDto.weight,
      calculateDailyTargetDto.age,
      calculateDailyTargetDto.activity_level,
      calculateDailyTargetDto.gender,
    );

    const newDailyTarget: Prisma.DailyTargetUncheckedCreateInput = {
      id: createId(),
      user_id,
      calories: dailyTarget.calories,
      protein: dailyTarget.protein,
      fat: dailyTarget.fat,
      carbohydrates: dailyTarget.carbohydrates,
      fiber: dailyTarget.fiber,
      sugar: dailyTarget.sugar,
    };

    return this.dailyTargetRepository.createDailyTarget(newDailyTarget);
  }

  async getDailyTargetByUserId(userId: string) {
    const dailyTarget = await this.dailyTargetRepository.getDailyTargetByUserId(userId);

    if (!dailyTarget) {
      throw new NotFoundException('Daily Target not created yet!');
    }

    console.log(dailyTarget)

    return dailyTarget;
  }
}
