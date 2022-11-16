import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService, UserInfo } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google-callback')
  async GoogleCallback(
    @Query('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: UserInfo = await this.authService.getGoogleInfo(code);

    //세션에 사용자 정보 저장
    let session: any = req.session;
    session.user = user;

    //DB에서 유저 확인
    //없으면 회원가입으로 redirect
    //있으면 메인으로 redirect

    return user;
  }

  @Get('/github-callback')
  async GithubCallback(
    @Query('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: UserInfo = await this.authService.getGithubInfo(code);

    //세션에 사용자 정보 저장
    let session: any = req.session;
    session.user = user;

    //DB에서 유저 확인
    //없으면 회원가입으로 redirect
    //있으면 메인으로 redirect

    return res.status(200).redirect('http://localhost:3001/api/auth/check');
  }
}
