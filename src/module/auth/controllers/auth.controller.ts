// src/auth/controllers/auth.controller.ts
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { TokenResponse } from '../interfaces/auth.interface';
import { AuthDto } from '../dtos/auth.dto';
import { createResponse, Response } from 'src/common/utils/response.util';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() authDto: AuthDto): Promise<Response<TokenResponse>> {
    return createResponse(await this.authService.signUp(authDto), 'Sign up successfully');
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() authDto: AuthDto): Promise<Response<TokenResponse>> {
    const response = await this.authService.signIn(authDto);
    return createResponse(response, 'Sign in successfully');
  }
}