import { Injectable } from '@nestjs/common';
import axios from 'axios';

// const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_AUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_AUTH_REDIRECT_URL = 'http://localhost:3001/auth/google-callback';

export interface UserInfo {
  email: string;
  picture: string;
}

@Injectable()
export class AuthService {
  async getGoogleInfo(code: string): Promise<UserInfo> {
    const { data } = await axios({
      method: 'POST',
      url: GOOGLE_AUTH_TOKEN_URL,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code', //특정 스트링
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: GOOGLE_AUTH_REDIRECT_URL,
        code: code,
      },
    });
    const accessToken = data['access_token'];

    const { data: userData } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
    );
    const { email, picture } = userData;
    const userInfo = {
      email,
      picture,
    };

    return userInfo;
  }
}
