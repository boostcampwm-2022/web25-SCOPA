import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { when } from 'jest-when';

import { errors } from 'src/common/response/error-response';
import { UserRepository } from 'src/user/user.repository';
import { AddLikeRequestDto } from './dto/add-like.dto';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';
import { plainToInstance } from 'class-transformer';
import { Like } from './entities/like.entity';

describe('LikeService', () => {
  const mockLikeRepository = {
    findLikeByUserId: jest.fn(),
    updateLikeByLikedIds: jest.fn(),
  };

  const mockUserRepository = {
    findUserById: jest.fn(),
  };

  const idOfUser1: string = new Types.ObjectId().toString();
  const idOfUser2: string = new Types.ObjectId().toString();
  const likeStub1 = plainToInstance(Like, {
    _id: new Types.ObjectId(),
    userId: idOfUser1,
    likedIds: [],
  });
  const likeStub2 = plainToInstance(Like, {
    _id: new Types.ObjectId(),
    userId: idOfUser1,
    likedIds: [idOfUser2],
  });
  const likeDto = plainToInstance(AddLikeRequestDto, {
    likedId: idOfUser2,
  });
  const userId = idOfUser1;

  let likeService: LikeService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
        {
          provide: LikeRepository,
          useValue: mockLikeRepository,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    likeService = module.get<LikeService>(LikeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('LikeService 가 정의되어야 합니다.', () => {
    expect(likeService).toBeDefined();
  });

  describe('addLike 메소드 테스트', () => {
    it('user1 의 좋아요 리스트에 user2 의 id 가 추가되어야 합니다.(정상 동작)', async () => {
      const expectedResult = {
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      };

      // checkUserId() 를 위한 mock 설정
      mockUserRepository.findUserById.mockResolvedValue({});

      // like document 조회 함수의 mock 설정
      when(mockLikeRepository.findLikeByUserId)
        .calledWith(idOfUser1)
        .mockResolvedValue(likeStub1);

      when(mockLikeRepository.updateLikeByLikedIds)
        .calledWith(userId, [...likeStub1.likedIds, likeDto.likedId])
        .mockResolvedValue(expectedResult);

      const result = await likeService.addLike(likeDto, userId);

      expect(result).toEqual(expectedResult);
      expect(mockUserRepository.findUserById).toBeCalledTimes(2);
      expect(mockLikeRepository.findLikeByUserId).toBeCalledTimes(1);
      expect(mockLikeRepository.updateLikeByLikedIds).toBeCalledTimes(1);
    });

    it('좋아요 리스트에 추가하려는 사용자가 이미 리스트에 있는 경우', async () => {
      // checkUserId() 를 위한 mock 설정
      mockUserRepository.findUserById.mockResolvedValue({});

      // like document 조회 함수의 mock 설정
      when(mockLikeRepository.findLikeByUserId)
        .calledWith(idOfUser1)
        .mockResolvedValue(likeStub2);

      expect(likeService.addLike(likeDto, userId)).rejects.toEqual(
        errors.ALREADY_EXIST_ID,
      );
    });
  });

  describe('deleteLike 메소드 테스트', () => {
    it('좋아요 리스트에 삭제하려는 사용자', async () => {
      const expectedResult = {
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      };

      // checkUserId() 를 위한 mock 설정
      mockUserRepository.findUserById.mockResolvedValue({});

      // like document 조회 함수의 mock 설정
      when(mockLikeRepository.findLikeByUserId)
        .calledWith(idOfUser1)
        .mockResolvedValue(likeStub1);

      when(mockLikeRepository.updateLikeByLikedIds)
        .calledWith(
          userId,
          ...likeStub2.likedIds.filter((id) => id !== likeDto.likedId),
        )
        .mockResolvedValue(expectedResult);

      const result = await likeService.deleteLike(likeDto, idOfUser1);

      expect(result).toEqual(expectedResult);
      expect(mockUserRepository.findUserById).toBeCalledTimes(2);
      expect(mockLikeRepository.findLikeByUserId).toBeCalledTimes(1);
      expect(mockLikeRepository.updateLikeByLikedIds).toBeCalledTimes(1);
    });
  });

  describe('checkUserId 메소드 테스트', () => {
    it('NOT_MATCHED_USER 에러가 발생해야 합니다.', async () => {
      mockUserRepository.findUserById.mockResolvedValue(null);

      expect(likeService.checkUserId(idOfUser1)).rejects.toEqual(
        errors.NOT_MATCHED_USER,
      );
      expect(mockUserRepository.findUserById).toBeCalledTimes(1);
    });
  });
});
