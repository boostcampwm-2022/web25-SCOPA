export interface UserInfo {
  authProvider: string;
  authId: string;
  email: string;
}

export type ErrorInfo = [number, string, number];

export interface ErrorResponse {
  code: number;
  message: string;
}

declare module 'express-session' {
  interface SessionData {
    user: UserInfo;
  }
}
