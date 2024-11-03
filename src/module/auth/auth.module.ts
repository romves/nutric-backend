import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './constants/jwt.constants';
import { JwtStrategy } from './strategies/jwt.strategies';
import { AuthRepository } from './repositories/auth.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANTS.secret,
      signOptions: {
        expiresIn: JWT_CONSTANTS.expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PasswordService,
    TokenService,
    JwtStrategy,
  ],
})
export class AuthModule {}
