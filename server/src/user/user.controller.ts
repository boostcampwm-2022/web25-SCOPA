import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  Req,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './user.service';
import { UserInfo } from 'src/d';
import { RequestUserDto } from './dto/create-user.dto';
import { errors } from '../common/response/error-response';
import { SuccessResponse } from '../common/response/success-response';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post('/register')
  async create(
    @Body() userDto: RequestUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userInfo = req.session.user;

    const createdUser = await this.userService.create(userDto, userInfo);

    if (!createdUser) {
      throw errors.REGIST_FAIL;
    }

    return res.status(200).send(new SuccessResponse());
  }

  // 전체 유저 조회
  @Get()
  findAll(@Req() req: Request) {
    // return this.userService.findAll();

    const authProvider: string = req.query.authProvider as string;
    const authId: string = req.query.authId as string;

    return this.userService.findOne(authProvider, authId);
  }

  // 아이디 유효성 & 중복 조회
  @Get('/validate')
  validateRegisterId(@Query('id') id: string, @Res() res: Response) {
    // 유효성 검사
    const regexEngNum = /^[a-zA-Z0-9]*$/;
    const isValidLength = id.length >= 4 && id.length <= 15;
    const isValidCharacter = regexEngNum.test(id);

    if (!(isValidLength && isValidCharacter)) {
      throw errors.INVALID_ID;
    }

    // 중복 확인
    const isDuplicated = false; // DB 설정이 완료되면 실제 중복을 체크하는 로직을 추가해야 합니다.

    if (isDuplicated) {
      throw errors.ID_DUPLICATED;
    }

    // 응답
    return res.status(200).send(new SuccessResponse());
  }

  // 회원 탈퇴
  @Delete('/withdraw')
  withdraw(@Req() req: Request, @Res() res: Response) {
    const userInfo: UserInfo = req.session.user;

    this.userService.remove(userInfo);

    // 응답
    return res.status(200).send({
      code: 10000,
      message: '성공',
    });
  }
}
