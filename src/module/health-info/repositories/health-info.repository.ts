import { Injectable } from '@nestjs/common';
import { HealthInfo, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/db/prisma/prisma.service';

@Injectable()
export class HealthInfoRepository {
  constructor(private prisma: PrismaService) {}

  async getHealthInfo(id: string): Promise<HealthInfo> {
    return this.prisma.healthInfo.findUnique({
      where: {
        id,
      },
      include: {
        allergies: true,
      },
    });
  }

  async createHealthInfo(healthInfo: Prisma.HealthInfoCreateInput) {
    try {
      return this.prisma.healthInfo.create({
        data: healthInfo,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateHealthInfo(id: string, healthInfo: HealthInfo) {
    return this.prisma.healthInfo.update({
      where: {
        id,
      },
      data: healthInfo,
    });
  }
}
