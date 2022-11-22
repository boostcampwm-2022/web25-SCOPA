import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { SuccessResponse } from 'src/common/response/success-response';
import { AddLikeRequestDto } from './dto/add-like.dto';

import { LikeService } from './like.service';

@Controller('/api/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  addLike(@Body() likeDto: AddLikeRequestDto, @Res() res: Response) {
    // 좋아요를 추가하는 service 로직 호출

    return res.status(200).send(new SuccessResponse());
  }

  @Delete()
  deleteLike(@Body() likeDto: AddLikeRequestDto, @Res() res: Response) {
    // 좋아요를 추가하는 service 로직 호출

    return res.status(200).send(new SuccessResponse());
  }

  @Get('/:id')
  findLikes(@Param('id') id: string, @Res() res: Response) {
    // param 에 담긴 id 의 좋아요 리스트를 반환하는 service 로직 호출

    // 반한된 좋아요 리스트와 함께 응답
    return res.status(200).send(new SuccessResponse());
  }
}
