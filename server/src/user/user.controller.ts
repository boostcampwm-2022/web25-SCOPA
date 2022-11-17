import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Res,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post('/register')
  async create(
    @Body() userDto: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userInfo = req.session.user;

    const createdUser = await this.userService.create(userDto, userInfo);

    if (!createdUser) {
      return res.status(400).send({
        code: 20004,
        message: '회원가입 실패',
      });
    }

    return res.status(200).send({
      code: 10000,
      message: '성공.',
    });
  }

  // 전체 유저 조회
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // 아이디 유효성 & 중복 조회
  @Get('/validate')
  validateRegisterId(@Query('id') id: string, @Res() res: Response) {
    // 유효성 검사
    const regexEngNum = /^[a-zA-Z0-9]*$/;
    const isValidLength = id.length >= 4 && id.length <= 15;
    const isValidCharacter = regexEngNum.test(id);

    if (!(isValidLength && isValidCharacter)) {
      return res.status(401).send({
        code: 20001,
        message: '유효하지 않은 ID 입니다.',
      });
    }

    // 중복 확인
    const isDuplicated = false; // DB 설정이 완료되면 실제 중복을 체크하는 로직을 추가해야 합니다.

    if (isDuplicated) {
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
