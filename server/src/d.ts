import { HttpStatus } from '@nestjs/common';

export interface AuthInfo {
  authProvider: string;
  authId: string;
}

export interface OAuthInfo extends AuthInfo {
  email: string;
}

export interface SessionInfo {
  authInfo?: AuthInfo;
  userId?: string;
}

export type ErrorInfo = [number, string, HttpStatus];

export interface ErrorResponse {
  code: number;
  message: string | Record<string, any>;
}
