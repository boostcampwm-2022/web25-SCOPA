import { Controller, Get, Query, Redirect, Res, Session } from '@nestjs/common';
import { Response } from 'express';

import { AuthInfo } from 'src/d';
import { AuthService } from './auth.service';
import { errors, SuccessResponse } from 'src/common/response/index';
import { UserService } from 'src/user/user.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/google-callback')
  @Redirect()
  async GoogleCallback(
    @Query('code') code: string,
    @Session() session: Record<string, any>,
  ) {
    const authInfo: AuthInfo = await this.authService.getGoogleInfo(code);

    //DB에서 유저 확인
    const user = await this.userService.findOne(
      authInfo.authProvider,
      authInfo.authId,
    );

    if (!user) {
      session.auth = authInfo;
      return { url: `${process.env.CLIENT_URL}/register` };
    }
    //세션에 사용자 정보 저장(로그인)
    session.userId = user._id.toString();
    return { url: `${process.env.CLIENT_URL}` };
  }

  @Get('/github-callback')
  @Redirect()
  async GithubCallback(
    @Query('code') code: string,
    @Session() session: Record<string, any>,
  ) {
    const authInfo: AuthInfo = await this.authService.getGithubInfo(code);

    //DB에서 유저 확인
    const user = await this.userService.findOne(
      authInfo.authProvider,
      authInfo.authId,
    );

    if (!user) {
      session.auth = authInfo;
      return { url: `${process.env.CLIENT_URL}/register` };
    }
    //세션에 사용자 정보 저장(로그인)
    session.userId = user._id.toString();
    return { url: `${process.env.CLIENT_URL}` };
  }

  @Get('/check')
  checkUser(@Session() session: Record<string, any>) {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }
    return new SuccessResponse({ id: session.userId });
  }

  @Get('/logout')
  logout(@Session() session: Record<string, any>, @Res() res: Response) {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    session.destroy(() => {
      session;
      res.clearCookie('connect.sid');
      res.status(200).send(new SuccessResponse());
    });
  }
}
