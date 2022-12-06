import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Session,
} from '@nestjs/common';

import { LikeService } from './like.service';
import { SuccessResponse, errors } from 'src/common/response/index';
import { AddLikeRequestDto } from './dto/add-like.dto';

@Controller('/api/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async addLike(
    @Body() likeDto: AddLikeRequestDto,
    @Session() session: Record<string, any>,
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
    @Body() likeDto: AddLikeRequestDto,
    @Session() session: Record<string, any>,
  ) {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    await this.likeService.deleteLike(likeDto, session.userId);

    return new SuccessResponse();
  }
}
