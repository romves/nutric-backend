import { Injectable } from '@nestjs/common';
import { UserResponse } from '../interfaces/auth.interface';
import { PrismaService } from 'src/common/db/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string, hashedPassword: string): Promise<UserResponse> {
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
      },
    });
  }

  async createGoogleUser(username: string, googleId: string): Promise<UserResponse> {
    return this.prisma.user.create({
      data: {
        username,
        google_id: googleId,
      },
      select: {
        id: true,
        username: true,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  }

  async findById(id: string): Promise<UserResponse | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
      },
    });
  }
  
  async findByGoogleToken(token: string): Promise<UserResponse | null> {
    return this.prisma.user.findFirst({
      where: {
        google_id: token,
      },
      select: {
        id: true,
        username: true,
      },
    });
  }
}