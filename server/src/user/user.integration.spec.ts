import * as request from 'supertest';
import { Model, Connection } from 'mongoose';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { USER } from './../test/stub';
import { UserModule } from 'src/user/user.module';
import { User, userSchema } from './entities/user.entity';
import { HttpExceptionFilter } from '../common/http-execption-filter';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from 'src/test/mongo';
import { CustomException, errors } from 'src/common/response';
import { Like, likeSchema } from 'src/like/entities/like.entity';

describe('User', () => {
  let userModel: Model<User>;
  let mongoConnection: Connection;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, rootMongooseTestModule()],
    }).compile();

    mongoConnection = await module.get(getConnectionToken());
    userModel = mongoConnection.model(User.name, userSchema);
    app = module.createNestApplication();
    setMiddleware(app);
  });

  afterEach(async () => {
    app.use((req, res, next) => {
      req.session = {};
      next();
    });
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    await app.close();
    await closeInMongodConnection();
  });

  describe('POST /register', () => {
    it('소셜 로그인 인증을 받은 유저는 회원가입에 성공한다.', async () => {
      const reqUser: User = USER.STUB1;
      const reqBody = {
        username: reqUser.username,
        interest: reqUser.interest,
        skills: reqUser.techStack,
      };
      const auth = {
        authProvider: reqUser.authProvider,
        authId: reqUser.authId,
        email: reqUser.email,
      };
      app.use((req, res, next) => {
        req.session = { auth };
        next();
      });
      await app.init();

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
      expect(createdUser).toEqual(expect.objectContaining(auth));
      expect(createdUser).toEqual(
        expect.objectContaining({
          username: reqUser.username,
          interest: reqUser.interest,
          techStack: reqUser.techStack,
        }),
      );

      //user 생성 시 like document도 같이 생성된다.
      const likeModel = mongoConnection.model(Like.name, likeSchema);
      const createdLike = await likeModel
        .findOne()
        .where('userId')
        .equals(res.body.data.id)
        .exec();
      expect(createdLike).toBeTruthy();
    });

    it('중복된 유저이름으로 가입하면 20002 오류(ID_DUPLICATED)가 발생한다.', async () => {
      const reqUser: User = USER.STUB3;
      const reqBody = {
        username: USER.STUB1.username, // 이미 가입된 이름
        interest: reqUser.interest,
        skills: reqUser.techStack,
      };
      const auth = {
        authProvider: reqUser.authProvider,
        authId: reqUser.authId,
        email: reqUser.email,
      };
      app.use((req, res, next) => {
        req.session = { auth };
        next();
      });
      await app.init();
      await userModel.create(USER.STUB1);

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
    it('정상 유저 아이디 유효성을 검사한다.', async () => {
      await app.init();
      return request(app.getHttpServer())
        .get('/api/users/validate?id=asetgdr')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('code', 10000);
        });
    });

    it('중복된 유저 아이디 검사는 20002 오류(ID_DUPLICATED)가 발생한다다.', async () => {
      await app.init();
      await userModel.create(USER.STUB1);

      return request(app.getHttpServer())
        .get(`/api/users/validate?id=${USER.STUB1.username}`)
        .expect(errors.ID_DUPLICATED[2])
        .expect((res) => {
          expect(res.body).toEqual(
            new CustomException(...errors.ID_DUPLICATED).getErrorResponse(),
          );
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
