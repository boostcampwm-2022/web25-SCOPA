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

import { SessionInfo } from 'src/d';
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
  async findAllProfiles(
    @Query() findUserRequest: FindUserRequest,
  ): Promise<SuccessResponse<PageUserResponse>> {
    // 임시 데이터
    const list = [];
    const teckStack = [];
    findUserRequest.skill1 && teckStack.push(findUserRequest.skill1);
    findUserRequest.skill2 && teckStack.push(findUserRequest.skill2);
    findUserRequest.skill3 && teckStack.push(findUserRequest.skill3);
    for (let i = 0; i < 6; i++) {
      list.push({
        id: '12345', // 상세 페이지 조회 및 좋아요 용도
        language: 'JavaScript',
        code: `console.log('hello world');\nreturn(0);`, // 프론트엔드에서 잘라서 사용
        teckStack,
        requirements: ['잠실사는사람만', '소통좋아해요'],
        liked: true,
      });
    }

    const response = {
      totalPage: 10, // 전체 페이지 수
      currentPage: findUserRequest.pages, // 현재 페이지 번호
      totalNumOfData: 63, // 총 데이터 개수
      list,
    };
    return new SuccessResponse(response);
  }
}
