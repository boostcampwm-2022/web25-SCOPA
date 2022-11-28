import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Like } from './entities/like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

describe('LikeController', () => {
  let controller: LikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: LikeService,
          useValue: {},
        },
        {
          provide: getModelToken(Like.name),
          useValue: Like,
        },
        {
          provide: getModelToken(User.name),
          useValue: User,
        },
      ],
    }).compile();

    controller = module.get<LikeController>(LikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
