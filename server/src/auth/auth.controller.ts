import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google-callback')
  async GoogleCallback(@Query('code') code: string) {
    const userInfo = await this.authService.getGooleInfo(code);
    return userInfo;
  }
}
