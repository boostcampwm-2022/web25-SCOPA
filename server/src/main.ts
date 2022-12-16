import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'src/common/http-execption-filter';

const PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // 전역 필터 적용
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(
    session({
      secret: 'users',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(PORT);
}
bootstrap();
