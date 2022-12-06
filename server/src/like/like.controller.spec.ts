import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { Types } from 'mongoose';
import { when } from 'jest-when';

import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { AddLikeRequestDto } from './dto/add-like.dto';
import { SuccessResponse } from 'src/common/response/success-response';
import { errors } from 'src/common/response/error-response';
import { DeleteLikeRequestDto } from './dto/delete-like.dto';

describe('LikeController', () => {
  const mockLikeService = {
    addLike: jest.fn(),
    deleteLike: jest.fn(),
  };

  let likeController: LikeController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [
        {
          provide: LikeService,
          useValue: mockLikeService,
        },
      ],
    }).compile();

    likeController = module.get<LikeController>(LikeController);
  });

  it('LikeController 가 정의되어야 합니다.', () => {
    expect(likeController).toBeDefined();
  });

  describe('addLike 메소드 테스트(POST. /api/like)', () => {
    const likeDto = plainToInstance(AddLikeRequestDto, {
      likedId: new Types.ObjectId().toString(),
    });

    it('session 에 유저 정보(userId)가 있으면 좋아요 리스트에 likeDto 에 있는 id 를 추가합니다.', async () => {
      const userSession = { userId: new Types.ObjectId().toString() };

      when(mockLikeService.addLike)
        .calledWith(likeDto, userSession.userId)
        .mockResolvedValue({});

      const response = await likeController.addLike(likeDto, userSession);

      expect(response).toEqual(new SuccessResponse());
    });

    it('session 에 유저 정보(userId)가 없으면 NOT_LOGGED_IN 에러가 발생합니다.', async () => {
      expect(likeController.addLike(likeDto, {})).rejects.toEqual(
        errors.NOT_LOGGED_IN,
      );
    });
  });

  describe('deleteLike 메소드 테스트(DELETE. /api/like)', () => {
    const likeDto = plainToInstance(DeleteLikeRequestDto, {
      likedId: new Types.ObjectId().toString(),
    });

    it('session 에 유저 정보(userId)가 있으면 좋아요 리스트에 likeDto 에 있는 id 를 삭제합니다.', async () => {
      const userSession = { userId: new Types.ObjectId().toString() };

      when(mockLikeService.deleteLike)
        .calledWith(likeDto, userSession.userId)
        .mockResolvedValue({});

      const response = await likeController.deleteLike(likeDto, userSession);

      expect(response).toEqual(new SuccessResponse());
    });

    it('session 에 유저 정보(userId)가 없으면 NOT_LOGGED_IN 에러가 발생합니다.', async () => {
      expect(likeController.deleteLike(likeDto, {})).rejects.toEqual(
        errors.NOT_LOGGED_IN,
      );
    });
  });
});
