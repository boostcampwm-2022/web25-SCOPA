import { getModelToken } from '@nestjs/mongoose';
import { connect, Connection, Model, Types } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { Like, likeSchema } from './entities/like.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { LikeRepository } from './like.repository';

describe('LikeRepository', () => {
  const likeStub1: Like = {
    _id: new Types.ObjectId(),
    userId: new Types.ObjectId().toString(),
    likedIds: [],
    createdAt: '',
    updatedAt: '',
  };

  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let likeRepository: LikeRepository;
  let likeModel: Model<Like>;
  let savedLike1: Like;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    likeModel = mongoConnection.model(Like.name, likeSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeRepository,
        {
          provide: getModelToken(Like.name),
          useValue: likeModel,
        },
      ],
    }).compile();

    likeRepository = module.get<LikeRepository>(LikeRepository);
  });

  beforeEach(async () => {
    savedLike1 = await likeRepository.create(likeStub1.userId);
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

  it('LikeRepository 가 정의되어야 합니다.', () => {
    expect(likeRepository).toBeDefined();
  });

  it('Like document 생성(create)', async () => {
    const like: Like = {
      _id: new Types.ObjectId(),
      userId: new Types.ObjectId().toString(),
      likedIds: [],
      createdAt: '',
      updatedAt: '',
    };

    const savedLike = await likeRepository.create(like.userId);

    expect(savedLike).toHaveProperty('userId', like.userId);
    expect(savedLike).toHaveProperty('likedIds', []);
    expect(savedLike).toHaveProperty('_id');
    expect(savedLike).toHaveProperty('createdAt');
    expect(savedLike).toHaveProperty('updatedAt');
  });

  it('userId 를 이용한 Like document 찾기(findLikeByUserId)', async () => {
    const like = await likeRepository.findLikeByUserId(savedLike1.userId);

    expect(like._id).toHaveProperty('_id', savedLike1._id);
  });

  it('likedIds 업데이트 하기(updateLikeByLikedIds', async () => {
    const likedUserId = new Types.ObjectId().toString();
    const newLikedIds = [...savedLike1.likedIds, likedUserId];

    await likeRepository.updateLikeByLikedIds(savedLike1.userId, newLikedIds);

    const like = await likeRepository.findLikeByUserId(savedLike1.userId);

    expect(like.likedIds).toStrictEqual(newLikedIds);
  });
});
