import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Session,
} from '@nestjs/common';

import { LikeService } from './like.service';
import { SuccessResponse, errors } from 'src/common/response/index';
import { AddLikeRequest } from './dto/add-like.dto';

@Controller('/api/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async addLike(
    @Body() likeDto: AddLikeRequest,
    @Session() session: Record<string, string>,
  ) {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    await this.likeService.addLike(likeDto, session.userId);

    return new SuccessResponse();
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteLike(
    @Body() likeDto: AddLikeRequest,
    @Session() session: Record<string, string>,
  ) {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    await this.likeService.deleteLike(likeDto, session.userId);

    return new SuccessResponse();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findLikes(@Param('id') id: string) {
    // param 에 담긴 id 의 좋아요 리스트를 반환하는 service 로직 호출

    // 반한된 좋아요 리스트와 함께 응답
    return new SuccessResponse();
  }
}
