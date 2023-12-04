import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('admin/login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.login('Admin', signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('admin/signup')
  signUp(@Body() signInDto: Record<string, any>) {
    return this.authService.signup(
      'Admin',
      signInDto.email,
      signInDto.password,
      signInDto,
    );
  }
}
