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
    if (!req.session.user) {
      throw errors.NOT_LOGGED_IN;
    }

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
    this.userService.validateUsername(id);

    // 중복 확인
    this.userService.checkDuplicatedUsername(id);

    // 응답
    return res.status(200).send(new SuccessResponse());
  }

  // 회원 탈퇴
  @Delete('/withdraw')
  withdraw(@Req() req: Request, @Res() res: Response) {
    if (!req.session.user) {
      throw errors.NOT_LOGGED_IN;
    }

    const userInfo: UserInfo = req.session.user;

    this.userService.remove(userInfo);

    return res.status(200).send(new SuccessResponse());
  }
}
