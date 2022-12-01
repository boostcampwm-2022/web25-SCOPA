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

import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { SuccessResponse, errors } from 'src/common/response/index';
import { UpdateUserRequestDto } from './dto/update-user.dto';
import { FindUserRequestDto, FindUserResponseDto } from './dto/find-user.dto';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(
    @Body() userDto: CreateUserRequestDto,
    @Session() session: Record<string, any>,
  ) {
    if (!session?.auth) {
      throw errors.NOT_OAUTH_LOGGED_IN;
    }
    if (session?.userId) {
      throw errors.LOGGED_IN;
    }
    const createdUser = await this.userService.createUser(
      userDto,
      session.auth,
    );

    session.auth = undefined;

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
  async withdraw(@Session() session: Record<string, any>) {
    if (!session?.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    await this.userService.remove(session.userId);

    return new SuccessResponse();
  }

  @Put('/edit')
  async edit(
    @Body() updateUserRequestDto: UpdateUserRequestDto,
    @Session() session: Record<string, any>,
  ) {
    if (!session?.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    return new SuccessResponse(updateUserRequestDto);
  }

  @Get('/:id')
  async findProfile(
    @Param('id') userId: string,
  ): Promise<SuccessResponse<FindUserResponseDto>> {
    // 임시 데이터
    console.log(userId);
    const mockUser = {
      username: 'limited-hyeon',
      code: `console.log('hello world');\nreturn(0);`,
      interest: 'frontemd',
      skills: ['react', 'typescript'],
      worktype: '페어 프로그래밍, 잠실역 근처',
      worktime: '새벽은 타협 가능하고 오후 1시부터 항상 비어있어요',
      email: 'earlybird@boostcamp.org',
      requirements: ['잠실사는사람만', '소통좋아해요'],
      liked: true,
    };
    return new SuccessResponse(mockUser);
  }

  @Get()
  async findAllProfiles(@Query() findUserRequestDto: FindUserRequestDto) {
    // 임시 데이터
    const list = [];
    const skills = [];
    findUserRequestDto.skill1 && skills.push(findUserRequestDto.skill1);
    findUserRequestDto.skill2 && skills.push(findUserRequestDto.skill2);
    findUserRequestDto.skill3 && skills.push(findUserRequestDto.skill3);
    for (let i = 0; i < 6; i++) {
      list.push({
        id: '12345', // 상세 페이지 조회 및 좋아요 용도
        language: 'JavaScript',
        code: `console.log('hello world');\nreturn(0);`, // 프론트엔드에서 잘라서 사용
        skills,
        requirements: ['잠실사는사람만', '소통좋아해요'],
        liked: true,
      });
    }

    const response = {
      totalPage: 10, // 전체 페이지 수
      currentPage: findUserRequestDto.pages, // 현재 페이지 번호
      totalNumOfData: 63, // 총 데이터 개수
      list,
    };
    return new SuccessResponse(response);
  }
}
