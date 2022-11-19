import { Request, Response } from 'express';
import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';

import { UserInfo } from 'src/d';
import { AuthService } from './auth.service';
import { errors } from './../../common/response/error-response';
import { SuccessResponse } from './../../common/response/success-response';

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
    const session = req.session;
    session.user = user;

    //DB에서 유저 확인
    //없으면 회원가입으로 redirect
    //있으면 메인으로 redirect

    return res.status(200).redirect(`${process.env.CLIENT_URL}/register`);
  }

  @Get('/github-callback')
  async GithubCallback(
    @Query('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: UserInfo = await this.authService.getGithubInfo(code);

    //세션에 사용자 정보 저장
    const session = req.session;
    session.user = user;

    //DB에서 유저 확인
    //없으면 회원가입으로 redirect
    //있으면 메인으로 redirect

    return res.status(200).redirect(`${process.env.CLIENT_URL}/register`);
  }

  @Get('/check')
  checkUser(@Req() req: Request, @Res() res: Response) {
    const session = req.session;

    if (!session.user) {
      throw errors.NOT_LOGGED_IN;
    }

    return res
      .status(200)
      .send(new SuccessResponse({ id: session.user.authId }));
  }
}
