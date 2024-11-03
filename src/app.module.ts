import { Module } from '@nestjs/common';
import { PrismaModule } from './common/db/prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
