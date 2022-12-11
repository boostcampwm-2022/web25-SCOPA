import * as request from 'supertest';
import { Model, Connection } from 'mongoose';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { SessionInfo, AuthInfo } from 'src/common/d';
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
import { PageUserResponse, SimplaUserResponse } from './dto/page-user.dto';
import { Interest, TechStack } from 'src/common/enum';

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
    const authInfo: AuthInfo = {
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
      const changeStub = FULL_USER.STUB2;
      const session: SessionInfo = {
        userId: existStub._id.toString(),
        authInfo: {
          authProvider: existStub.authProvider,
          authId: existStub.authId,
          email: existStub.email,
        },
      };
      const updateRequest = {
        username: changeStub.username,
        email: changeStub.email,
        code: changeStub.code,
        language: changeStub.language,
        interest: changeStub.interest,
        techStack: [],
        worktype: changeStub.worktype,
        worktime: changeStub.worktime,
        requirements: changeStub.requirements,
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
      expect(findUser.code).toEqual(changeStub.code);
      expect(findUser.language).toEqual(changeStub.language);
      expect(findUser.createdAt).not.toEqual(findUser.updatedAt);
      expect(findUser).toEqual(
        expect.objectContaining({
          authProvider: existStub.authProvider,
          authId: existStub.authId,
          createdAt: savedUser.createdAt,
        }),
      );
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

  describe('GET / (pagination)', () => {
    const ids = [];
    beforeEach(async () => {
      // 유저 15명
      ids.length = 0;
      for (let i = 0; i < 5; i++) {
        const u1 = await userModel.create({
          authProvider: 'google',
          authId: `${i * 3}`,
          email: `${i * 3}@gmail.com`,
          username: `${i * 3}`,
          code: `${i * 3}`,
          interest: Interest.FRONTEND,
          techStack: [TechStack.REACT, TechStack.RECOIL],
        });
        const u2 = await userModel.create({
          authProvider: 'google',
          authId: `${i * 3 + 1}`,
          email: `${i * 3 + 1}@gmail.com`,
          username: `${i * 3 + 1}`,
          code: `${i * 3 + 1}`,
          interest: Interest.BACKEND,
          techStack: [TechStack.JAVA, TechStack.MYSQL],
        });
        const u3 = await userModel.create({
          authProvider: 'google',
          authId: `${i * 3 + 2}`,
          email: `${i * 3 + 2}@gmail.com`,
          username: `${i * 3 + 2}`,
          code: `${i * 3 + 2}`,
          interest: Interest.FRONTEND,
          techStack: [TechStack.VUE, TechStack.RECOIL, TechStack.REACT],
        });
        // 자신 보다 먼저 저장된 유저를 좋아요
        await likeModel.create({
          userId: u1._id.toString(),
          likedIds: [...ids],
        });
        ids.push(u1._id.toString());
        await likeModel.create({
          userId: u2._id.toString(),
          likedIds: [...ids],
        });
        ids.push(u2._id.toString());
        await likeModel.create({
          userId: u3._id.toString(),
          likedIds: [...ids],
        });
        ids.push(u3._id.toString());
      }
    });
    it('로그인 하지 않고 backend만 페이징', async () => {
      await app.init();

      return request(app.getHttpServer())
        .get(`/api/users?interest=Backend`)
        .expect(200)
        .expect((res) => {
          const page: PageUserResponse = res.body.data;
          expect(page).toEqual(
            expect.objectContaining({
              totalPage: 1,
              currentPage: 1,
              totalNumOfData: 5,
            }),
          );
          expect(page.list.length).toEqual(5);
          page.list.forEach((profile: SimplaUserResponse, i) => {
            expect(profile.code).toEqual(`${13 - i * 3}`);
            expect(profile.techStack).toEqual([
              TechStack.JAVA,
              TechStack.MYSQL,
            ]);
            expect(profile.liked).toEqual(false);
          });
        });
    });

    it('로그인 한 유저가 interest와 techStack을 필터링한다.', async () => {
      app.use((req, res, next) => {
        req.session = { userId: ids[9] };
        next();
      });
      await app.init();

      return request(app.getHttpServer())
        .get(`/api/users?interest=Frontend&skill1=Recoil&skill2=Vue&page=1`)
        .expect(200)
        .expect((res) => {
          const page: PageUserResponse = res.body.data;
          expect(page).toEqual(
            expect.objectContaining({
              totalPage: 1,
              currentPage: 1,
              totalNumOfData: 5,
            }),
          );
          expect(page.list.length).toEqual(5);
          page.list.forEach((profile, i: number) => {
            expect(profile.liked).toEqual(i > 1);
            expect(profile.techStack).toEqual([
              TechStack.VUE,
              TechStack.RECOIL,
              TechStack.REACT,
            ]);
          });
        });
    });

    it('로그인한 유저가 liked true를 필터링한다.', async () => {
      app.use((req, res, next) => {
        req.session = { userId: ids[9] };
        next();
      });
      await app.init();

      return request(app.getHttpServer())
        .get(`/api/users?page=2&liked=true`)
        .expect(200)
        .expect((res) => {
          const page: PageUserResponse = res.body.data;
          expect(page).toEqual(
            expect.objectContaining({
              totalPage: 2,
              currentPage: 2,
              totalNumOfData: 9,
            }),
          );
          expect(page.list.length).toEqual(3);
          page.list.forEach((profile, i) => {
            expect(profile.liked).toEqual(true);
            expect(profile.code).toEqual(`${2 - i}`);
          });
        });
    });
  });

  describe('GET /messageInfos', () => {
    let savedUser1: User;

    beforeEach(async () => {
      // 로그인 한 사용자 === user1
      app.use((req, res, next) => {
        req.session = {
          userId: CREATE_USER.STUB1._id.toString(),
        };
        next();
      });
      await app.init();
      savedUser1 = await userModel.create(CREATE_USER.STUB1);
    });
    it('user1 의 쪽지방 목록 조회', async () => {
      expect(savedUser1.messageInfos).toEqual([]);

      await request(app.getHttpServer())
        .get('/api/users/messageInfos')
        .expect(200, { code: 10000, message: '성공', data: [] });
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
