import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, UserResponse } from '../interfaces/auth.interface';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: UserResponse) {
    const payload: JwtPayload = { sub: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
}
