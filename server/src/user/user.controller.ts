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
import { errors } from 'common/response/error-response';
import { SuccessResponse } from './../../common/response/success-response';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(
    @Body() userDto: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userInfo = req.session.user;

    if (!this.userService.create(userDto, userInfo)) {
      throw errors.REGIST_FAIL;
    }

    return res.status(200).send(new SuccessResponse());
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

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
}
