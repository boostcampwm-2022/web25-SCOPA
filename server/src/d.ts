import { HttpStatus } from '@nestjs/common';

export interface AuthInfo {
  authProvider: string;
  authId: string;
  email: string;
}

export type ErrorInfo = [number, string, HttpStatus];

export interface ErrorResponse {
  code: number;
  message: string | object;
}
