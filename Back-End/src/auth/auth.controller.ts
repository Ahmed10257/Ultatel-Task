
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { email: string, password: string }) {
    return this.authService.login(signInDto.email, signInDto.password);
  }

  @Post('register')
  async register(@Body() registerDto: { fullName: string, email: string, password: string }) {
    return this.authService.register(registerDto)
  }

}
