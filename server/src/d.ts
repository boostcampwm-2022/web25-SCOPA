import { UserInfo } from './auth/auth.service';

declare module 'express-session' {
  interface SessionData {
    user: UserInfo;
  }
}
