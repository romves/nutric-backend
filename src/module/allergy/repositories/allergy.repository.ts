import { Injectable } from '@nestjs/common';
import { Allergy } from '@prisma/client';
import { PrismaService } from '../../../common/db/prisma/prisma.service';

@Injectable()
export class AllergyRepository {
  constructor(private prisma: PrismaService) {}

  async getAllergies(): Promise<Allergy[]> {
    return this.prisma.allergy.findMany();
  }

  async getAllergy(name: string): Promise<Allergy> {
    return this.prisma.allergy.findUnique({
      where: {
        name,
      },
    });
  }

  async createAllergy(allergy: Allergy) {
    return this.prisma.allergy.create({
      data: allergy,
    });
  }

  async updateAllergy(name: string, allergy: Allergy) {
    return this.prisma.allergy.update({
      where: {
        name,
      },
      data: allergy,
    });
  }

  async deleteAllergy(name: string) {
    return this.prisma.allergy.delete({
      where: {
        name,
      },
    });
  }
}
