export interface UserInfo {
  authProvider: string;
  authId: string;
  email: string;
}

declare module 'express-session' {
  interface SessionData {
    user: UserInfo;
  }
}
