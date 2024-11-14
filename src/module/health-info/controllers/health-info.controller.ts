import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user/user.decorator';
import { JwtAuthGuard } from 'src/module/auth/guards/auth.guard';
import { CreateHealthInfoDto } from '../dtos/health-info.dto';
import { User as UserT } from '@prisma/client';
import { HealthInfoService } from '../services/health-info.service';
import { ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('health-info')
@ApiBearerAuth('JWT-auth')
export class HealthInfoController {
  constructor(private healthInfoService: HealthInfoService) {}

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
}
