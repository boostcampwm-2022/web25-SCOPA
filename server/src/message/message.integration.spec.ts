import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { User, userSchema } from 'src/user/entities/user.entity';
import { Message, messageSchema } from './entities/message.entity';
import { MessageModule } from './message.module';
import { HttpExceptionFilter } from 'src/common/http-execption-filter';
import { CREATE_USER } from 'src/test/stub';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'src/test/mongo';

describe('Message 모듈 통합 테스트', () => {
  let app: INestApplication;
  let mongoConnection: Connection;
  let messageModel: Model<Message>;
  let userModel: Model<User>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [MessageModule, rootMongooseTestModule()],
    }).compile();

    mongoConnection = await module.get(getConnectionToken());
    userModel = mongoConnection.model(User.name, userSchema);
    messageModel = mongoConnection.model(Message.name, messageSchema);

    app = module.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
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
    await closeInMongodConnection();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('GET /:to API 테스트(로그인 상태)', () => {
    let savedUser2: User;

    it('200 응답, to 와의 쪽지방 쪽지 내역 조회 성공(처음 쪽지를 보내는 경우)', async () => {
      await userModel.create(CREATE_USER.STUB1);
      savedUser2 = await userModel.create(CREATE_USER.STUB2);
      const IdOfUser2 = savedUser2._id.toString();

      await request(app.getHttpServer())
        .get(`/api/message/${IdOfUser2}`)
        .expect(200, { code: 10000, message: '성공', data: [] });
    });
  });

  describe('POST /send API 테스트(로그인 상태)', () => {
    let savedUser1: User;
    let savedUser2: User;

    it('200 응답, to 와의 쪽지 내역에 새로운 content 추가 성공', async () => {
      savedUser1 = await userModel.create(CREATE_USER.STUB1);
      savedUser2 = await userModel.create(CREATE_USER.STUB2);
      const IdOfUser1 = savedUser1._id.toString();
      const IdOfUser2 = savedUser2._id.toString();
      const sortedParticipants = [IdOfUser1, IdOfUser2].sort();
      const participants = sortedParticipants[0] + ',' + sortedParticipants[1];
      await messageModel.create({ participants, contents: [] });

      await request(app.getHttpServer())
        .post(`/api/message/send`)
        .send({ to: IdOfUser2, content: '이 쪽지는 테스트용 입니다.' })
        .expect(201, { code: 10000, message: '성공' });
    });
  });
});
