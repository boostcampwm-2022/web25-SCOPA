import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types, Model, Connection, connect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { HttpStatus } from '@nestjs/common';

import { User, userSchema } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Like, likeSchema } from './entities/like.entity';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';
import { UserService } from 'src/user/user.service';

describe('LikeService', () => {
  let likeService: LikeService;
  let userService: UserService;
  let likeRepository: LikeRepository;
  let userRepository: UserRepository;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let likeModel: Model<Like>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, userSchema);
    likeModel = mongoConnection.model(Like.name, likeSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
        LikeRepository,
        UserRepository,
        UserService,
        {
          provide: getModelToken(Like.name),
          useValue: likeModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    likeService = module.get<LikeService>(LikeService);
    likeRepository = module.get<LikeRepository>(LikeRepository);
    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('addLike', () => {
    it('user1 의 likedIds 에 idOfUser2 가 추가되어야 합니다', async () => {
      // Given
      const user1 = await userRepository.create({
        authProvider: 'google',
        authId: 'user1',
        email: 'test@test.com',
        username: 'user1',
      });
      const idOfUser1 = user1._id.toString();
      const user2 = await userRepository.create({
        authProvider: 'google',
        authId: 'user2',
        email: 'test@test.com',
        username: 'user2',
      });
      const idOfUser2 = user2._id.toString();
      await likeRepository.createLike(idOfUser1, []);

      // When
      await likeService.addLike({ likedId: idOfUser2 }, idOfUser1);

      //Then
      likeRepository.findLikeByUserId(idOfUser1).then((result) => {
        expect(result.likedIds).toEqual([idOfUser2]);
      });
    });
  });

  describe('deleteLike', () => {
    it('user1 의 좋아요 리스트에 있는 idOfUser2 가 삭제되어야 합니다.', async () => {
      // Given
      const user1 = await userRepository.create({
        authProvider: 'google',
        authId: 'user1',
        email: 'test@test.com',
        username: 'user1',
      });
      const idOfUser1 = user1._id.toString();
      const user2 = await userRepository.create({
        authProvider: 'google',
        authId: 'user2',
        email: 'test@test.com',
        username: 'user2',
      });
      const idOfUser2 = user2._id.toString();
      await likeRepository.createLike(idOfUser1, [idOfUser2]);

      // When
      await likeService.deleteLike({ likedId: idOfUser2 }, idOfUser1);

      //Then
      likeRepository.findLikeByUserId(idOfUser1).then((result) => {
        expect(result.likedIds).toEqual([]);
      });
    });
  });

  describe('checkUserId', () => {
    it('20006 에러가 발생해야 합니다.', async () => {
      // Given
      const userData = {
        authProvider: 'google',
        authId: 'test1',
        email: 'test1@test.com',
        username: 'test1',
      };
      await userRepository.create(userData);
      const newId = new Types.ObjectId().toString();

      try {
        // When
        await likeService.checkUserId(newId.toString());
      } catch (e) {
        // Then
        expect(e).toStrictEqual([
          20006,
          '일치하는 유저 정보가 없습니다.',
          HttpStatus.BAD_REQUEST,
        ]);
      }
    });
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });
});
