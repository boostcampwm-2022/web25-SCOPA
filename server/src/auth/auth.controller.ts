import { Request, Response } from 'express';
import { Controller, Get, Query, Req, Res } from '@nestjs/common';

import { UserInfo } from 'src/d';
import { AuthService } from './auth.service';
import { errors } from 'src/common/response/error-response';
import { SuccessResponse } from 'src/common/response/success-response';
import { UserService } from 'src/user/user.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/google-callback')
  async GoogleCallback(
    @Query('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userInfo: UserInfo = await this.authService.getGoogleInfo(code);

    //세션에 사용자 정보 저장
    const session = req.session;
    session.user = userInfo;

    //DB에서 유저 확인
    const user = this.userService.findOne(
      userInfo.authProvider,
      userInfo.authId,
    );

    if (!user) {
      res.status(200).redirect(`${process.env.CLIENT_URL}/register`);
    }

    return res.status(200).redirect(`${process.env.CLIENT_URL}`);
  }

  @Get('/github-callback')
  async GithubCallback(
    @Query('code') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userInfo: UserInfo = await this.authService.getGithubInfo(code);

    //세션에 사용자 정보 저장
    const session = req.session;
    session.user = userInfo;

    //DB에서 유저 확인
    const user = this.userService.findOne(
      userInfo.authProvider,
      userInfo.authId,
    );

    if (!user) {
      res.status(200).redirect(`${process.env.CLIENT_URL}/register`);
    }

    return res.status(200).redirect(`${process.env.CLIENT_URL}`);
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
