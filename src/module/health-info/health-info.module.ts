import { Module } from '@nestjs/common';
import { HealthInfoController } from './controllers/health-info.controller';
import { HealthInfoService } from './services/health-info.service';
import { HealthInfoRepository } from './repositories/health-info.repository';

@Module({
  controllers: [HealthInfoController],
  providers: [HealthInfoService, HealthInfoRepository],
  exports: [HealthInfoService, HealthInfoRepository],
})
export class HealthInfoModule {}
