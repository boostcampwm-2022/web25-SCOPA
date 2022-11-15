import { Controller, Get, Query } from '@nestjs/common';
import { AuthService, UserInfo } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google-callback')
  async GoogleCallback(@Query('code') code: string) {
    const user: UserInfo = await this.authService.getGoogleInfo(code);

    //DB에서 유저 확인
    //없으면 회원가입으로 redirect
    //있으면 메인으로 redirect

    return user;
  }

  @Get('github-callback')
  async GithubCallback(@Query('code') code: string) {
    const user: UserInfo = await this.authService.getGithubInfo(code);

    //세션에 저장
    //DB에서 유저 확인
    //없으면 회원가입으로 redirect
    //있으면 메인으로 redirect

    return user;
  }
}
