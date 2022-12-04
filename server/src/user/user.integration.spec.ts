import * as request from 'supertest';
import { Model, Connection } from 'mongoose';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { SessionInfo } from 'src/d';
import { CREATE_USER, FULL_USER } from './../test/stub';
import { UserModule } from 'src/user/user.module';
import { User, userSchema } from './entities/user.entity';
import { HttpExceptionFilter } from '../common/http-execption-filter';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from 'src/test/mongo';
import { CustomException, errors } from 'src/common/response';
import { Like, likeSchema } from 'src/like/entities/like.entity';
import { FindUserResponse } from './dto/find-user.dto';

describe('User', () => {
  let userModel: Model<User>;
  let likeModel: Model<Like>;
  let mongoConnection: Connection;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, rootMongooseTestModule()],
    }).compile();

    mongoConnection = await module.get(getConnectionToken());
    userModel = mongoConnection.model(User.name, userSchema);
    likeModel = mongoConnection.model(Like.name, likeSchema);
    app = module.createNestApplication();
    setMiddleware(app);
  });

  // 매 테스트 마다 세션, DB 데이터 초기화
  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    await app.close();
    await closeInMongodConnection();
  });

  describe('POST /register', () => {
    const reqUser: User = CREATE_USER.STUB1;
    const authInfo = {
      authProvider: reqUser.authProvider,
      authId: reqUser.authId,
      email: reqUser.email,
    };
    beforeEach(async () => {
      app.use((req, res, next) => {
        req.session = { authInfo };
        next();
      });
      await app.init();
    });
    it('소셜 로그인 인증을 받은 유저는 회원가입에 성공한다.', async () => {
      const reqBody = {
        username: reqUser.username,
        interest: reqUser.interest,
        techStack: reqUser.techStack,
      };

      const res = await request(app.getHttpServer())
        .post('/api/users/register')
        .send(reqBody)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('code', 10000);
          expect(res.body.data).toHaveProperty('id');
        });

      // 실제 저장된 user 확인
      const createdUser = await userModel.findById(res.body.data.id).exec();
      expect(createdUser).toEqual(expect.objectContaining(authInfo));
      expect(createdUser).toEqual(
        expect.objectContaining({
          username: reqUser.username,
          interest: reqUser.interest,
          techStack: reqUser.techStack,
        }),
      );

      //user 생성 시 like document도 같이 생성된다.
      const createdLike = await likeModel
        .findOne()
        .where('userId')
        .equals(res.body.data.id)
        .exec();
      expect(createdLike).toBeTruthy();
    });

    it('중복된 유저이름으로 가입하면 20002 오류(ID_DUPLICATED)가 발생한다.', async () => {
      const reqBody = {
        username: CREATE_USER.STUB3.username, // 이미 가입된 이름
        interest: reqUser.interest,
        techStack: reqUser.techStack,
      };
      await userModel.create(CREATE_USER.STUB3);

      return request(app.getHttpServer())
        .post('/api/users/register')
        .send(reqBody)
        .expect(errors.ID_DUPLICATED[2])
        .expect((res) => {
          expect(res.body).toEqual(
            new CustomException(...errors.ID_DUPLICATED).getErrorResponse(),
          );
        });
    });
  });

  describe('GET /validate', () => {
    it('정상적인 유저 아이디 유효성을 검사한다.', async () => {
      await app.init();
      return request(app.getHttpServer())
        .get('/api/users/validate?id=asetgdr')
        .expect(200, { code: 10000, message: '성공' });
    });

    it('중복된 유저 아이디 검사는 20002 오류(ID_DUPLICATED)가 발생한다.', async () => {
      await app.init();
      await userModel.create(CREATE_USER.STUB1);

      return request(app.getHttpServer())
        .get(`/api/users/validate?id=${CREATE_USER.STUB1.username}`)
        .expect(errors.ID_DUPLICATED[2])
        .expect((res) => {
          expect(res.body).toEqual(
            new CustomException(...errors.ID_DUPLICATED).getErrorResponse(),
          );
        });
    });
  });

  describe('PUT /edit', () => {
    it('STUB1의 데이터를 STUB2의 데이터로 업데이트한다.', async () => {
      const existStub = FULL_USER.STUB1;
      const chageStub = FULL_USER.STUB2;
      const session: SessionInfo = {
        userId: existStub._id.toString(),
        authInfo: {
          authProvider: existStub.authProvider,
          authId: existStub.authId,
        },
      };
      const updateRequest = {
        username: chageStub.username,
        email: chageStub.email,
        code: chageStub.code,
        interest: chageStub.interest,
        techStack: chageStub.techStack,
        worktype: chageStub.worktype,
        worktime: chageStub.worktime,
        requirements: chageStub.requirements,
      };
      app.use((req, res, next) => {
        req.session = session;
        next();
      });
      await app.init();
      const savedUser = await userModel.create(existStub);

      await request(app.getHttpServer())
        .put('/api/users/edit')
        .send(updateRequest)
        .expect(200, { code: 10000, message: '성공' });

      const findUser = await userModel.findOne(savedUser._id);
      expect(findUser).toEqual(expect.objectContaining(updateRequest));
      expect(findUser.code).toEqual(chageStub.code);
    });
  });

  describe('GET /:id', () => {
    let savedUser1: User;
    let savedUser2: User;
    let savedUser3: User;
    beforeEach(async () => {
      savedUser1 = await userModel.create(CREATE_USER.STUB1);
      savedUser2 = await userModel.create(CREATE_USER.STUB2);
      savedUser3 = await userModel.create(CREATE_USER.STUB3);
      await likeModel.create({
        // 1이 2,3을 좋아요
        userId: savedUser1._id,
        likedIds: [savedUser2._id.toString(), savedUser3._id.toString()],
      });
      await likeModel.create({
        // 2가 3을 좋아요
        userId: savedUser2._id,
        likedIds: [savedUser3._id.toString()],
      });
      await likeModel.create({ userId: savedUser3._id, likedIds: [] });
    });
    it('로그인 하지 않고 ID로 유저를 찾는다.', async () => {
      await app.init();

      return request(app.getHttpServer())
        .get(`/api/users/${savedUser1._id.toString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual(
            new FindUserResponse(savedUser1, false),
          );
          expect(res.body.data.liked).toBe(false);
        });
    });
    it('로그인을 하고 ID로 좋아요한 유저를 찾는다.', async () => {
      app.use((req, res, next) => {
        req.session = { userId: savedUser1._id.toString() };
        next();
      });
      await app.init();

      return request(app.getHttpServer())
        .get(`/api/users/${savedUser3._id.toString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual(new FindUserResponse(savedUser3, true));
          // 1은 3를 좋아요
          expect(res.body.data.liked).toBe(true);
        });
    });
    it('로그인을 하고 ID로 좋아요하지 않은 유저를 찾는다.', async () => {
      app.use((req, res, next) => {
        req.session = { userId: savedUser2._id.toString() };
        next();
      });
      await app.init();
      return request(app.getHttpServer())
        .get(`/api/users/${savedUser1._id.toString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual(
            new FindUserResponse(savedUser1, false),
          );
          // 2는 1를 좋아요X
          expect(res.body.data.liked).toBe(false);
        });
    });
  });
});

function setMiddleware(app: INestApplication) {
  app.useGlobalFilters(new HttpExceptionFilter()); // 전역 필터 적용
  app.useGlobalPipes(
    // DTO 변환
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
