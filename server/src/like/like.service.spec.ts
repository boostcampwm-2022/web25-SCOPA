import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';

import { errors } from 'src/common/response/error-response';
import { UserRepository } from 'src/user/user.repository';
import { AddLikeRequestDto } from './dto/add-like.dto';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';

describe('LikeService', () => {
  const mockLikeRepository = {
    findLikeByUserId: jest.fn(),
    updateLikeByLikedIds: jest.fn(),
  };

  const mockUserRepository = {
    findUserById: jest.fn(),
  };

  let likeService: LikeService;
  let idOfUser1: string;
  let idOfUser2: string;

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

  beforeEach(async () => {
    idOfUser1 = new Types.ObjectId().toString();
    idOfUser2 = new Types.ObjectId().toString();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('LikeService 가 정의되어야 합니다.', () => {
    expect(likeService).toBeDefined();
  });

  describe('addLike 메소드 테스트', () => {
    it('user1 의 좋아요 리스트에 user2 의 id 가 추가되어야 합니다.(정상 동작)', async () => {
      const likeDto: AddLikeRequestDto = {
        likedId: idOfUser2,
      };
      mockUserRepository.findUserById.mockResolvedValue({});
      mockLikeRepository.findLikeByUserId.mockResolvedValue({
        likedIds: [],
      });
      mockLikeRepository.updateLikeByLikedIds.mockResolvedValue({
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      });

      await likeService.addLike(likeDto, idOfUser1);

      expect(mockUserRepository.findUserById).toBeCalledTimes(2);
      expect(mockLikeRepository.findLikeByUserId).toBeCalledTimes(1);
      expect(mockLikeRepository.updateLikeByLikedIds).toBeCalledTimes(1);
    });

    it('좋아요 리스트에 추가하려는 사용자가 이미 리스트에 있는 경우', async () => {
      const likeDto: AddLikeRequestDto = {
        likedId: idOfUser2,
      };
      mockUserRepository.findUserById.mockResolvedValue({});
      mockLikeRepository.findLikeByUserId.mockResolvedValue({
        likedIds: [idOfUser2],
      });

      expect(likeService.addLike(likeDto, idOfUser1)).rejects.toEqual(
        errors.ALREADY_EXIST_ID,
      );
      expect(mockUserRepository.findUserById).toBeCalledTimes(1); // 이거 왜 1이지?
    });
  });

  describe('deleteLike 메소드 테스트', () => {
    it('좋아요 리스트에 삭제하려는 사용자', async () => {
      const likeDto: AddLikeRequestDto = {
        likedId: idOfUser2,
      };
      mockUserRepository.findUserById.mockResolvedValue({});
      mockLikeRepository.findLikeByUserId.mockResolvedValue({
        likedIds: [idOfUser2],
      });
      mockLikeRepository.updateLikeByLikedIds.mockResolvedValue({
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      });

      await likeService.deleteLike(likeDto, idOfUser1);

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
