import { Controller, Get, Query, Redirect, Res, Session } from '@nestjs/common';
import { Response } from 'express';

import { SessionInfo } from 'src/common/d';
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
    @Session() session: SessionInfo,
  ) {
    const authInfo = await this.authService.getGoogleInfo(code);

    //DB에서 유저 확인
    const user = await this.userService.findUserByAuth(
      authInfo.authProvider,
      authInfo.authId,
    );

    if (!user) {
      session.authInfo = authInfo;
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
    @Session() session: SessionInfo,
  ) {
    const authInfo = await this.authService.getGithubInfo(code);

    //DB에서 유저 확인
    const user = await this.userService.findUserByAuth(
      authInfo.authProvider,
      authInfo.authId,
    );

    if (!user) {
      session.authInfo = authInfo;
      return { url: `${process.env.CLIENT_URL}/register` };
    }
    //세션에 사용자 정보 저장(로그인)
    session.userId = user._id.toString();
    return { url: `${process.env.CLIENT_URL}` };
  }

  @Get('/check')
  checkUser(@Session() session: SessionInfo) {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }
    return new SuccessResponse({ id: session.userId });
  }

  @Get('/logout')
  logout(@Session() session: Record<string, any>, @Res() res: Response) {
    session.destroy();
    res.clearCookie('connect.sid');
    console.log(session);
    res.status(200).send(new SuccessResponse());
  }
}
