import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Session,
} from '@nestjs/common';

import { SessionInfo } from 'src/common/d';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/create-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import { FindUserRequest, FindUserResponse } from './dto/find-user.dto';
import { LikeService } from './../like/like.service';
import { PageUserResponse } from './dto/page-user.dto';
import { SuccessResponse, errors } from 'src/common/response/index';

@Controller('/api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly likeService: LikeService,
  ) {}

  @Post('/register')
  async register(
    @Body() userDto: CreateUserRequest,
    @Session() session: SessionInfo,
  ) {
    if (!session?.authInfo) {
      throw errors.NOT_OAUTH_LOGGED_IN;
    }
    if (session?.userId) {
      throw errors.LOGGED_IN;
    }
    const createdUser = await this.userService.createUser(
      userDto,
      session.authInfo,
    );
    session.authInfo = undefined;
    return new SuccessResponse({ id: createdUser._id.toString() });
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

  @Delete('/withdraw')
  async withdraw(@Session() session: SessionInfo) {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    await this.userService.remove(session.userId);

    return new SuccessResponse();
  }

  @Put('/edit')
  async edit(
    @Body() updateUserRequest: UpdateUserRequest,
    @Session() session: SessionInfo,
  ) {
    await this.userService.updateUser(session, updateUserRequest);
    return new SuccessResponse();
  }

  @Get('/:id')
  async findProfile(
    @Param('id') userId: string,
    @Session() session: SessionInfo,
  ): Promise<SuccessResponse<FindUserResponse>> {
    const user = await this.userService.findUserById(userId);
    const liked = session?.userId
      ? await this.likeService.isLiked(session.userId, userId)
      : false;

    return new SuccessResponse(new FindUserResponse(user, liked));
  }

  @Get()
  async findProfiles(
    @Query() findUserRequest: FindUserRequest,
    @Session() session: SessionInfo,
  ): Promise<SuccessResponse<PageUserResponse>> {
    const response = await this.userService.findAll(
      findUserRequest,
      session?.userId,
    );
    return new SuccessResponse(response);
  }
}
