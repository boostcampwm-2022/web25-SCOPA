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

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google-callback')
  async GoogleCallback(@Query('code') code: string) {
    const email = await this.authService.getGoogleInfo(code);
    //DB에서 유저 확인
    //없으면 회원가입으로 redirect
    //있으면 메인으로 redirect
    return email;
  }

  @Get('github-callback')
  async GithubCallback(@Query('code') code: string) {
    const email = await this.authService.getGithubInfo(code);

    //DB에서 유저 확인
    //없으면 회원가입으로 redirect
    //있으면 메인으로 redirect

    return email;
  }
}
