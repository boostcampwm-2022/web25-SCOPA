import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection, Model } from 'mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'src/test/mongo';

import { AuthModule } from './auth.module';
import { User, userSchema } from 'src/user/entities/user.entity';
import { HttpExceptionFilter } from 'src/common/http-execption-filter';
import { CREATE_USER } from 'src/test/stub';
import axios from 'axios';
import { CustomException, errors } from 'src/common/response';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('User', () => {
  let userModel: Model<User>;
  let mongoConnection: Connection;
  let app: INestApplication;
  process.env.CLIENT_URL = 'http://localhost:3000';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, rootMongooseTestModule()],
    }).compile();

    mongoConnection = await module.get(getConnectionToken());
    userModel = mongoConnection.model(User.name, userSchema);
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

  describe('GET /google-callback', () => {
    const reqUser: User = CREATE_USER.STUB1;
    beforeEach(async () => {
      app.use((req, res, next) => {
        req.session = {};
        next();
      });
      await app.init();
    });

    it('회원 가입한 유저는 main 페이지로 리디렉션 된다.', async () => {
      const authCode = '11111';
      const axiosAccessToken = { data: { access_token: '22222' } };
      const axiosUserInfo = {
        data: { sub: reqUser.authId },
      };
      await userModel.create(CREATE_USER.STUB1);

      mockedAxios.post.mockResolvedValue(axiosAccessToken);
      mockedAxios.get.mockResolvedValue(axiosUserInfo);

      return await request(app.getHttpServer())
        .get(`/api/auth/google-callback?code=${authCode}`)
        .expect(302)
        .expect('Location', `${process.env.CLIENT_URL}`);
    });

    it('회원 가입하지 않은 유저는 register 페이지로 리디렉션 된다.', async () => {
      const authCode = '11111';
      const axiosAccessToken = { data: { access_token: '22222' } };
      const axiosUserInfo = {
        data: { sub: reqUser.authId },
      };

      mockedAxios.post.mockResolvedValue(axiosAccessToken);
      mockedAxios.get.mockResolvedValue(axiosUserInfo);

      return await request(app.getHttpServer())
        .get(`/api/auth/google-callback?code=${authCode}`)
        .expect(302)
        .expect('Location', `${process.env.CLIENT_URL}/register`);
    });

    it('authrization code 오류가 발생하면 INVALID_AUTH_CODE 에러를 던진다. ', async () => {
      const authCode = '11111';
      const axiosAccessToken = { data: { error: true } };

      mockedAxios.post.mockResolvedValue(axiosAccessToken);

      return await request(app.getHttpServer())
        .get(`/api/auth/google-callback?code=${authCode}`)
        .expect(errors.INVALID_AUTH_CODE[2])
        .expect((res) => {
          expect(res.body).toEqual(
            new CustomException(...errors.INVALID_AUTH_CODE).getErrorResponse(),
          );
        });
    });
  });

  describe('GET /github-callback', () => {
    const reqUser: User = CREATE_USER.STUB2;
    beforeEach(async () => {
      app.use((req, res, next) => {
        req.session = {};
        next();
      });
      await app.init();
    });

    it('회원 가입한 유저는 main 페이지로 리디렉션 된다.', async () => {
      const authCode = '11111';
      const axiosAccessToken = { data: { access_token: '22222' } };
      const axiosUserId = {
        data: { id: Number(reqUser.authId) },
      };

      console.log(await userModel.create(reqUser));

      mockedAxios.post.mockResolvedValue(axiosAccessToken);
      mockedAxios.get.mockResolvedValue(axiosUserId);

      return await request(app.getHttpServer())
        .get(`/api/auth/github-callback?code=${authCode}`)
        .expect(302)
        .expect('Location', `${process.env.CLIENT_URL}`);
    });

    it('회원 가입하지 않은 유저는 register 페이지로 리디렉션 된다.', async () => {
      const authCode = '11111';
      const axiosAccessToken = { data: { access_token: '22222' } };
      const axiosUserInfo = {
        data: { sub: reqUser.authId },
      };

      mockedAxios.post.mockResolvedValue(axiosAccessToken);
      mockedAxios.get.mockResolvedValue(axiosUserInfo);

      return await request(app.getHttpServer())
        .get(`/api/auth/github-callback?code=${authCode}`)
        .expect(302)
        .expect('Location', `${process.env.CLIENT_URL}/register`);
    });

    it('authrization code 오류가 발생하면 INVALID_AUTH_CODE 에러를 던진다. ', async () => {
      const authCode = '11111';
      const axiosAccessToken = { data: { error: true } };

      mockedAxios.post.mockResolvedValue(axiosAccessToken);

      return await request(app.getHttpServer())
        .get(`/api/auth/github-callback?code=${authCode}`)
        .expect(errors.INVALID_AUTH_CODE[2])
        .expect((res) => {
          expect(res.body).toEqual(
            new CustomException(...errors.INVALID_AUTH_CODE).getErrorResponse(),
          );
        });
    });

    it('url 파라미터에 error=access_denied가 있으면 login 페이지로 이동한다.', async () => {
      return await request(app.getHttpServer())
        .get(`/api/auth/github-callback?error=access_denied`)
        .expect(302)
        .expect('Location', `${process.env.CLIENT_URL}/login`);
    });
  });

  describe('GET /check', () => {
    it('로그인 상태이면 userId를 반환한다.', async () => {
      const userId = 123;
      app.use((req, res, next) => {
        req.session = { userId };
        next();
      });
      await app.init();
      return await request(app.getHttpServer())
        .get(`/api/auth/check`)
        .expect(200, { code: 10000, message: '성공', data: { id: userId } });
    });
    it('로그인 상태가 아니면 NOT_LOGGED_IN 오류가 발생한다.', async () => {
      app.use((req, res, next) => {
        req.session = {};
        next();
      });

      await app.init();
      return await request(app.getHttpServer())
        .get(`/api/auth/check`)
        .expect(errors.NOT_LOGGED_IN[2])
        .expect((res) => {
          expect(res.body).toEqual(
            new CustomException(...errors.NOT_LOGGED_IN).getErrorResponse(),
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
      transform: true,
    }),
  );
}
