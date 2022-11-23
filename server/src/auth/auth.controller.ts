import { Controller, Get, Query, Redirect, Session } from '@nestjs/common';

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
  @Redirect()
  async GoogleCallback(
    @Query('code') code: string,
    @Session() session: Record<string, any>,
  ) {
    const userInfo: UserInfo = await this.authService.getGoogleInfo(code);

    //DB에서 유저 확인
    const user = await this.userService.findOne(
      userInfo.authProvider,
      userInfo.authId,
    );

    if (!user) {
      session.oauth = userInfo;
      return { url: `${process.env.CLIENT_URL}/register` };
    }
    //세션에 사용자 정보 저장(로그인)
    session.id = user._id.toString();
    return { url: `${process.env.CLIENT_URL}` };
  }

  @Get('/github-callback')
  @Redirect()
  async GithubCallback(
    @Query('code') code: string,
    @Session() session: Record<string, any>,
  ) {
    const userInfo: UserInfo = await this.authService.getGithubInfo(code);

    //DB에서 유저 확인
    const user = await this.userService.findOne(
      userInfo.authProvider,
      userInfo.authId,
    );

    if (!user) {
      session.oauth = userInfo;
      return { url: `${process.env.CLIENT_URL}/register` };
    }
    //세션에 사용자 정보 저장(로그인)
    session.id = user._id.toString();
    return { url: `${process.env.CLIENT_URL}` };
  }

  @Get('/check')
  checkUser(@Session() session: Record<string, any>) {
    if (!session.id) {
      throw errors.NOT_LOGGED_IN;
    }
    return new SuccessResponse({ id: session.id });
  }
}
