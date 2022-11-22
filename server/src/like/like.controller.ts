import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LikeService } from './like.service';
import { SuccessResponse } from 'src/common/response/success-response';
import { AddLikeRequestDto } from './dto/add-like.dto';
import { errors } from 'src/common/response/error-response';

@Controller('/api/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  addLike(
    @Body() likeDto: AddLikeRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!req.session.user) {
      throw errors.NOT_LOGGED_IN;
    }

    // 좋아요를 추가하는 service 로직 호출
    this.likeService.addLike(likeDto, req.session.user);

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
