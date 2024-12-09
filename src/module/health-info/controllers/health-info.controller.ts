import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { User as UserT } from '@prisma/client';
import { JwtAuthGuard } from '../../../module/auth/guards/auth.guard';
import { User } from '../../../common/decorators/user/user.decorator';
import { CreateHealthInfoDto } from '../dtos/health-info.dto';
import { HealthInfoService } from '../services/health-info.service';
import { DailyTargetService } from '../services/daily-target.service';

@UseGuards(JwtAuthGuard)
@Controller('health-info')
@ApiBearerAuth('JWT-auth')
export class HealthInfoController {
  constructor(private healthInfoService: HealthInfoService, private dailyTargetService: DailyTargetService) {}

  @Get()
  async getHealthInfo(@User() user: UserT) {
    return this.healthInfoService.getHealthInfo(user);
  }

  @ApiBody({
    type: CreateHealthInfoDto,
  })
  @Post()
  async addHealthInfo(
    @Body() createHealthInfoDto: CreateHealthInfoDto,
    @User() user: UserT,
  ) {
    return this.healthInfoService.createHealthInfo(createHealthInfoDto, user);
  }

  @ApiBody({
    type: CreateHealthInfoDto,
  })
  @Put()
  async updateHealthInfo(
    @Body() updateHealthInfoDto: CreateHealthInfoDto,
    @User() user: UserT,
  ) {
    return this.healthInfoService.updateHealthInfo(updateHealthInfoDto, user);
  }
  
  @Get('daily-target')
  async getDailyTarget(@User() user: UserT) {
    return this.dailyTargetService.getDailyTargetByUserId(user.id);
  }
}
