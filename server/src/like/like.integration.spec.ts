import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

import { CREATE_USER } from './../test/stub';
import { User, userSchema } from 'src/user/entities/user.entity';
import { Like, likeSchema } from './entities/like.entity';
import { LikeModule } from './like.module';
import { UserRepository } from 'src/user/user.repository';
import { LikeRepository } from './like.repository';
import { HttpExceptionFilter } from 'src/common/http-execption-filter';
import { CustomException, errors } from 'src/common/response';

describe('Like 모듈 통합 테스트', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userRepository: UserRepository;
  let likeRepository: LikeRepository;
  let userModel: Model<User>;
  let likeModel: Model<Like>;
  let savedLike1: Like;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, userSchema);
    likeModel = mongoConnection.model(Like.name, likeSchema);

    const module = await Test.createTestingModule({
      imports: [LikeModule],
    })

      .overrideProvider(UserRepository)
      .useClass(UserRepository)
      .overrideProvider(LikeRepository)
      .useClass(LikeRepository)
      .overrideProvider(getModelToken(User.name))
      .useValue(userModel)
      .overrideProvider(getModelToken(Like.name))
      .useValue(likeModel)
      .compile();

    userRepository = module.get<UserRepository>(UserRepository);
    likeRepository = module.get<LikeRepository>(LikeRepository);
    app = module.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  });

  beforeEach(async () => {
    await userRepository.create(CREATE_USER.STUB1);
    await userRepository.create(CREATE_USER.STUB2);
    savedLike1 = await likeRepository.create(CREATE_USER.STUB1._id.toString());
    await likeRepository.create(CREATE_USER.STUB2._id.toString());
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

  describe('로그인 상태', () => {
    beforeAll(async () => {
      // 로그인 한 사용자 === user1
      app.use((req, res, next) => {
        req.session = {
          userId: CREATE_USER.STUB1._id.toString(),
        };
        next();
      });
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    describe('POST /api/like 좋아요 리스트에 추가', () => {
      it('200 응답, 좋아요 리스트에 추가 성공', async () => {
        expect(savedLike1.likedIds).toEqual([]);

        await request(app.getHttpServer())
          .post('/api/like')
          .send({ likedId: CREATE_USER.STUB2._id.toString() })
          .expect(200, { code: 10000, message: '성공' });

        const nextLikeOfUser1 = await likeRepository.findByUserId(
          CREATE_USER.STUB1._id.toString(),
        );
        expect(nextLikeOfUser1.likedIds).toEqual([
          CREATE_USER.STUB2._id.toString(),
        ]);
      });

      it('400 응답, likeDto 에 담긴 likedId 가 올바르지 않은 경우', async () => {
        await request(app.getHttpServer())
          .post('/api/like')
          .send({ likedId: new Types.ObjectId().toString() })
          .expect(
            400,
            new CustomException(...errors.NOT_MATCHED_USER).getErrorResponse(),
          );
      });

      it('400 응답, 중복된 사용자를 추가하고자 하는 경우', async () => {
        //미리 user1 의 좋아요 리스트에 user2 의 id 추가
        await likeRepository.updateByLikedIds(
          CREATE_USER.STUB1._id.toString(),
          [CREATE_USER.STUB2._id.toString()],
        );
        const likeOfUser1 = await likeRepository.findByUserId(
          CREATE_USER.STUB1._id.toString(),
        );
        expect(likeOfUser1.likedIds).toEqual([
          CREATE_USER.STUB2._id.toString(),
        ]);

        //user1 의 좋아요 리스트에 user2 의 id 추가 -> 400 에러 발생
        await request(app.getHttpServer())
          .post('/api/like')
          .send({ likedId: CREATE_USER.STUB2._id.toString() })
          .expect(
            400,
            new CustomException(...errors.ALREADY_EXIST_ID).getErrorResponse(),
          );
      });
    });

    describe('DELETE /api/like 좋아요 리스트에서 삭제', () => {
      it('200 응답, 좋아요 리스트에 삭제 성공', async () => {
        await likeRepository.updateByLikedIds(
          CREATE_USER.STUB1._id.toString(),
          [CREATE_USER.STUB2._id.toString()],
        );
        const likeOfUser1 = await likeRepository.findByUserId(
          CREATE_USER.STUB1._id.toString(),
        );
        expect(likeOfUser1.likedIds).toEqual([
          CREATE_USER.STUB2._id.toString(),
        ]);

        await request(app.getHttpServer())
          .delete('/api/like')
          .send({ likedId: CREATE_USER.STUB2._id.toString() })
          .expect(200, { code: 10000, message: '성공' });

        const nextLikeOfUser1 = await likeRepository.findByUserId(
          CREATE_USER.STUB1._id.toString(),
        );
        expect(nextLikeOfUser1.likedIds).toEqual([]);
      });

      it('400 응답, likeDto 에 담긴 likedId 가 올바르지 않은 경우', async () => {
        await request(app.getHttpServer())
          .delete('/api/like')
          .send({ likedId: new Types.ObjectId().toString() })
          .expect(
            400,
            new CustomException(...errors.NOT_MATCHED_USER).getErrorResponse(),
          );
      });
    });
  });

  describe('비로그인 상태', () => {
    beforeAll(async () => {
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    it('401 응답, 로그인 상태가 아닌 경우(POST /api/like)', async () => {
      request(app.getHttpServer())
        .post('/api/like')
        .send({ likedId: CREATE_USER.STUB2._id.toString() })
        .expect(
          401,
          new CustomException(...errors.NOT_LOGGED_IN).getErrorResponse(),
        );
    });
  });
});
