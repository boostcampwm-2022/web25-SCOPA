import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

import { User, userSchema } from 'src/user/entities/user.entity';
import { Like, likeSchema } from './entities/like.entity';
import { LikeModule } from './like.module';

describe('Like 모듈 통합 테스트', () => {
  let app: INestApplication;
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

    const module = await Test.createTestingModule({
      imports: [LikeModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(userModel)
      .overrideProvider(getModelToken(Like.name))
      .useValue(likeModel)
      .compile();

    app = module.createNestApplication();
    app.use((req, res, next) => {
      req.session = {
        userId: new Types.ObjectId().toString(),
      };
      next();
    });
    await app.init();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
    await app.close();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('GET /api/like/:id', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/like/1')
      .expect(200);

    console.log(res.body);
  });

  it('test', async () => {
    const res = await request(app.getHttpServer()).post('/api/like');
    // .send({ likedId: new Types.ObjectId().toString() });

    console.log(res.body);
  });
});
