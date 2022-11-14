import { Injectable } from '@nestjs/common';
import axios from 'axios';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_REDIRECT_URL = 'http://localhost:3001/auth/google-callback';
const GOOGLE_INFO_URL = `https://www.googleapis.com/oauth2/v3/userinfo`;

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

@Injectable()
export class AuthService {
  async getGoogleInfo(authCode: string): Promise<string> {
    const accessToken = await this.getGoogleAccessToken(authCode);

    const { data } = await axios.get(
      `${GOOGLE_INFO_URL}?access_token=${accessToken}`,
    );
    return data['email'];
  }

  private async getGoogleAccessToken(code: string): Promise<string> {
    const { data } = await axios({
      method: 'POST',
      url: GOOGLE_TOKEN_URL,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code', //특정 스트링
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: GOOGLE_REDIRECT_URL,
        code: code,
      },
    });
    return data['access_token'];
  }

  async getGithubInfo(authCode: string): Promise<string> {
    const accessToken = await this.getGithubAccessToken(authCode);

    return '';
  }

  private async getGithubAccessToken(code: string): Promise<string> {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    };

    const { data } = await axios.post(GITHUB_TOKEN_URL, body, {
      headers: { Accept: 'application/json' },
    });

    return data['access_token'];
  }
}
