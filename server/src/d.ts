import { HttpStatus } from '@nestjs/common';

export interface UserInfo {
  authProvider: string;
  authId: string;
  email: string;
}

export type ErrorInfo = [number, string, HttpStatus];

export interface ErrorResponse {
  code: number;
  message: string;
}

declare module 'express-session' {
  interface SessionData {
    user: UserInfo;
  }
}
