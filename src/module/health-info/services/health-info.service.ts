import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { CreateHealthInfoDto } from '../dtos/health-info.dto';
import { HealthInfoRepository } from '../repositories/health-info.repository';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class HealthInfoService {
  constructor(private healthInfoRepository: HealthInfoRepository) {}

  async createHealthInfo(createHealthInfoDto: CreateHealthInfoDto, user: User) {
    const existingHealthInfo = await this.healthInfoRepository.getHealthInfo(
      user.id,
    );

    if (existingHealthInfo) {
      throw new ConflictException('Health info already exists for this user');
    }

    const newHealthInfo: Prisma.HealthInfoUncheckedCreateInput = {
      id: createId(),
      user_id: user.id,
      height: createHealthInfoDto.height,
      weight: createHealthInfoDto.weight,
      age: createHealthInfoDto.age,
      activity_level: createHealthInfoDto.activity_level,
      allergies: {
        connect: createHealthInfoDto.allergies_name.map((allergy) => ({
          name: allergy,
        })),
      },
    };
    return this.healthInfoRepository.createHealthInfo(newHealthInfo);
  }

  async getHealthInfo(user: User) {
    const healthInfo = await this.healthInfoRepository.getHealthInfo(user.id);

    if (!healthInfo) {
      throw new NotFoundException('Health info not created yet');
    }

    return healthInfo;
  }

  async updateHealthInfo(updateHealthInfoDto: CreateHealthInfoDto, user: User) {
    const healthInfo = await this.healthInfoRepository.getHealthInfo(user.id);

    if (!healthInfo) {
      throw new NotFoundException('Health info not created yet');
    }

    const updatedHealthInfo: Prisma.HealthInfoUpdateInput = {
      height: updateHealthInfoDto.height,
      weight: updateHealthInfoDto.weight,
      age: updateHealthInfoDto.age,
      activity_level: updateHealthInfoDto.activity_level,
      allergies: {
        set: updateHealthInfoDto.allergies_name.map((allergy) => ({
          name: allergy,
        })),
      },
    };

    return this.healthInfoRepository.updateHealthInfo(
      user.id,
      updatedHealthInfo,
    );
  }
}
