// src/auth/controllers/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { createResponse, Response } from '../../../common/utils/response.util';
import { AuthDto } from '../dtos/auth.dto';
import { GoogleLoginDto } from '../dtos/google-login.dto';
import { TokenResponse } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: AuthDto,
  })
  @Post('signup')
  async signUp(@Body() authDto: AuthDto): Promise<Response<TokenResponse>> {
    return createResponse(
      await this.authService.signUp(authDto),
      'Sign up successfully',
    );
  }

  @ApiBody({
    type: AuthDto,
  })
  @Post('signin')
  async signIn(@Body() authDto: AuthDto): Promise<Response<TokenResponse>> {
    const response = await this.authService.signIn(authDto);
    return createResponse(response, 'Sign in successfully');
  }

  @ApiBody({
    type: GoogleLoginDto,
  })
  @Post('google-login')
  async googleLogin(
    @Body() googleLoginDto: GoogleLoginDto,
  ): Promise<Response<TokenResponse>> {
    return createResponse(
      await this.authService.verifyGoogleToken(googleLoginDto),
      'Sign in successfully',
    );
  }
}
