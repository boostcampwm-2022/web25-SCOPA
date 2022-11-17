import { Request, Response } from 'express';
import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';

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
    const session = req.session;
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
    const session = req.session;
    session.user = user;

    //DB에서 유저 확인
    //없으면 회원가입으로 redirect
    //있으면 메인으로 redirect

    return res.status(200).redirect('http://localhost:3001/api/auth/check');
  }

  @Get('/check')
  checkUser(@Req() req: Request, @Res() res: Response) {
    const session = req.session;

    if (!session.user) {
      return res.status(401).send({
        code: 20003,
        message: '로그인 상태가 아닙니다.',
      });
    }

    return res.status(200).send({
      code: 10000,
      message: '성공',
      data: {
        id: session.user.id,
      },
    });
  }

  @Get('/validate')
  validateRegisterId(@Query('id') id: string, @Res() res: Response) {
    // 유효성 검사
    const regexEngNum = /^[a-zA-Z0-9]*$/;
    const isValidateLength = id.length >= 4 && id.length <= 15;
    const isValidateCharacter = regexEngNum.test(id);

    if (!(isValidateLength && isValidateCharacter)) {
      return res.status(401).send({
        code: 20001,
        message: '유효하지 않은 ID 입니다.',
      });
    }

    // 중복 확인
    const isDuplicate = false; // DB 설정이 완료되면 실제 중복을 체크하는 로직을 추가해야 합니다.

    if (isDuplicate) {
      return res.status(401).send({
        code: 20002,
        message: '중복된 ID 입니다.',
      });
    }

    // 응답
    return res.status(200).send({
      code: 10000,
      message: '성공.',
    });
  }
}
