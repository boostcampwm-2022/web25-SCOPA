import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Session,
} from '@nestjs/common';

import { UserInfo } from 'src/d';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { errors } from 'src/common/response/error-response';
import { SuccessResponse } from 'src/common/response/success-response';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post('/register')
  async create(
    @Body() userDto: CreateUserRequestDto,
    @Session() session: Record<string, any>,
  ) {
    if (!session.oauth) {
      throw errors.NOT_OAUTH_LOGGED_IN;
    }
    if (session.id) {
      throw errors.LOGGED_IN;
    }
    const createdUser = await this.userService.create(userDto, session.oauth);

    session.oauth = undefined;
    session.id = createdUser._id.toString();

    return new SuccessResponse();
  }

  // 전체 유저 조회
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // 아이디 유효성 & 중복 조회
  @Get('/validate')
  async validateRegisterId(@Query('id') id: string) {
    // 유효성 검사
    this.userService.validateUsername(id);

    // 중복 확인
    await this.userService.checkDuplicatedUsername(id);

    // 응답
    return new SuccessResponse();
  }

  // 회원 탈퇴
  @Delete('/withdraw')
  withdraw(@Session() session: Record<string, any>) {
    if (!session.id) {
      throw errors.NOT_LOGGED_IN;
    }

    this.userService.remove(session.id);

    return new SuccessResponse();
  }
}
