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

  @Post('/register')
  create(@Body() userDto: CreateUserDto, @Req() req: Request) {
    const userInfo = req.session.user;

    return this.userService.create(userDto, userInfo);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
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
