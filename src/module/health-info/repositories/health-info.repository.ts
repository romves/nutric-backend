import { Injectable } from '@nestjs/common';
import { Allergy, HealthInfo, Prisma } from '@prisma/client';
import { PrismaService } from '../../../common/db/prisma/prisma.service';

@Injectable()
export class HealthInfoRepository {
  constructor(private prisma: PrismaService) {}

  async getHealthInfo(id: string): Promise<
    HealthInfo & {
      allergies: Allergy[];
    }
  > {
    return this.prisma.healthInfo.findUnique({
      where: {
        user_id: id,
      },
      include: {
        allergies: true,
      },
    });
  }

  async createHealthInfo(healthInfo: Prisma.HealthInfoUncheckedCreateInput) {
    try {
      return this.prisma.healthInfo.create({
        data: healthInfo,
        include: {
          allergies: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateHealthInfo(
    id: string,
    healthInfo: Prisma.HealthInfoUpdateInput,
  ) {
    return this.prisma.healthInfo.update({
      where: {
        user_id: id,
      },
      data: healthInfo,
      include: {
        allergies: true,
      },
    });
  }
}
