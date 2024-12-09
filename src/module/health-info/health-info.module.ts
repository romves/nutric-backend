import { Module } from '@nestjs/common';
import { HealthInfoController } from './controllers/health-info.controller';
import { HealthInfoService } from './services/health-info.service';
import { HealthInfoRepository } from './repositories/health-info.repository';
import { DailyTargetService } from './services/daily-target.service';
import { DailyTargetRepository } from './repositories/daily-target.repository';

@Module({
  controllers: [HealthInfoController],
  providers: [HealthInfoService, HealthInfoRepository, DailyTargetService, DailyTargetRepository],
  exports: [HealthInfoService, HealthInfoRepository],
})
export class HealthInfoModule {}
