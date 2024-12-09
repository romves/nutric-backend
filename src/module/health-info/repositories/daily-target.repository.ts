import { Injectable } from "@nestjs/common";
import { DailyTarget, Prisma } from "@prisma/client";
import { PrismaService } from "src/common/db/prisma/prisma.service";

@Injectable()
export class DailyTargetRepository {
    constructor(private prisma: PrismaService) {}
    
    async getDailyTargetByUserId(userId: string) {
        return this.prisma.dailyTarget.findUnique({
            where: {
                user_id: userId,
            },
        });
    }

    async createDailyTarget(dailyTarget: Prisma.DailyTargetUncheckedCreateInput) {
        return this.prisma.dailyTarget.create({
            data: dailyTarget,
        });
    }
}