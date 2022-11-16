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
  await app.listen(PORT);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://scoap.ga'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(
    session({
      secret: 'users',
      resave: false,
      saveUninitialized: false,
    }),
  );
}
bootstrap();
