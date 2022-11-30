import * as request from 'supertest';
import { Model } from 'mongoose';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { UserModule } from 'src/user/user.module';
import { User, userSchema } from './entities/user.entity';
import { HttpExceptionFilter } from '../common/http-execption-filter';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from 'src/databse/mongo';

describe('User', () => {
  let userModel: Model<User>;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, rootMongooseTestModule()],
    }).compile();

    const mongoConnection = await module.get(getConnectionToken());
    userModel = mongoConnection.model(User.name, userSchema);
    app = module.createNestApplication();
    setMiddleware(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});

function setMiddleware(app: INestApplication) {
  app.use((req, res, next) => {
    // 세션 설정
    req.session = {
      id: '12345',
    };
    next();
  });
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
