
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async signIn(@Body() signInDto: { email: string, password: string }, @Res() res: Response) {
    try {
      // Call the login method from the AuthService and set the access token to the jwt_token.access_token
      const jwt_token = await this.authService.login(signInDto.email, signInDto.password);
      const access_token = jwt_token.access_token;
      // Return the access token in the response along with the status code and message
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        access_token
      });
    } catch (error) {
      // Handle the case of wrong credentials
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid email or password'
      });
    }
  }

  @Post('register')
  async register(@Body() registerDto: { fullName: string, email: string, password: string }, @Res() res: Response) {

    const user = await this.authService.register(registerDto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      user
    });
  }

}
