import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as session from 'express-session';

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
  await app.listen(PORT);
}
bootstrap();
