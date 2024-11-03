import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma/prisma.service';
import { AuthRepository } from '../repositories/auth.repository';
import { TokenService } from './token.service';
import { PasswordService } from './password.service';
import { AuthDto } from '../dtos/auth.dto';
import { TokenResponse } from '../interfaces/auth.interface';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginDto } from '../dtos/google-login.dto';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    private authRepository: AuthRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async signUp(authDto: AuthDto): Promise<TokenResponse> {
    const hashedPassword = await this.passwordService.hash(authDto.password);

    try {
      const user = await this.authRepository.createUser(
        authDto.username,
        hashedPassword,
      );
      return this.tokenService.generateToken(user);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new UnauthorizedException('Username already exists');
      }
      throw error;
    }
  }

  async signIn(authDto: AuthDto): Promise<TokenResponse> {
    const user = await this.authRepository.findByUsername(authDto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.compare(
      authDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    return this.tokenService.generateToken(userWithoutPassword);
  }

  async validateUser(userId: string) {
    return this.authRepository.findById(userId);
  }

  async verifyGoogleToken(
    googleLoginDto: GoogleLoginDto,
  ): Promise<TokenResponse> {
    const ticket = await this.client.verifyIdToken({
      idToken: googleLoginDto.token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const googleId = payload.sub;

    let user = await this.authRepository.findByGoogleToken(googleId);

    if (!user) {
      user = await this.authRepository.createGoogleUser(
        payload.name,
        payload.sub,
      );
    }

    return this.tokenService.generateToken(user);
  }
}
