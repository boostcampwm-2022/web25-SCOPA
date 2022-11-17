export interface UserInfo {
  authProvider: string;
  authId: string;
  email: string;
}

export type ErrorInfo = [number, string, number];

declare module 'express-session' {
  interface SessionData {
    user: UserInfo;
  }
}
