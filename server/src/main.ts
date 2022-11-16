import * as path from 'path';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

dotenv.config({
  path: path.resolve('.env'),
});

const PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'users',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000', 'http://scopa.ga'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(PORT);
}
bootstrap();
