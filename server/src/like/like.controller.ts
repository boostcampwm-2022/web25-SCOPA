import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { Response } from 'express';

import { LikeService } from './like.service';
import { SuccessResponse } from 'src/common/response/success-response';
import { AddLikeRequestDto } from './dto/add-like.dto';
import { errors } from 'src/common/response/error-response';

@Controller('/api/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  addLike(
    @Body() likeDto: AddLikeRequestDto,
    @Session() session: Record<string, any>,
  ) {
    if (!session.user) {
      throw errors.NOT_LOGGED_IN;
    }

    this.likeService.addLike(likeDto, session.user);

    return new SuccessResponse();
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  deleteLike(
    @Body() likeDto: AddLikeRequestDto,
    @Session() session: Record<string, any>,
  ) {
    if (!session.user) {
      throw errors.NOT_LOGGED_IN;
    }

    this.likeService.deleteLike(likeDto, session.user);

    return new SuccessResponse();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findLikes(@Param('id') id: string, @Res() res: Response) {
    // param 에 담긴 id 의 좋아요 리스트를 반환하는 service 로직 호출

    // 반한된 좋아요 리스트와 함께 응답
    return new SuccessResponse();
  }
}
