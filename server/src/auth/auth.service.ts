import axios from 'axios';
import { HttpException, Injectable } from '@nestjs/common';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_REDIRECT_URL = `${process.env.SERVER_URL}/api/auth/google-callback`;
const GOOGLE_INFO_URL = `https://www.googleapis.com/oauth2/v3/userinfo`;

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_API_URL = 'https://api.github.com/';

export interface UserInfo {
  id: number;
  email: string;
}

@Injectable()
export class AuthService {
  async getGoogleInfo(authCode: string): Promise<UserInfo> {
    const accessToken = await this.getGoogleAccessToken(authCode);

    const { data: userData } = await axios.get(
      `${GOOGLE_INFO_URL}?access_token=${accessToken}`,
    );

    return {
      id: +userData.sub,
      email: userData.email,
    };
  }

  private async getGoogleAccessToken(code: string): Promise<string> {
    const { data: tokenData } = await axios({
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

    if (tokenData.error)
      throw new HttpException('The code is incorrect or expired', 401);

    return tokenData['access_token'];
  }

  async getGithubInfo(authCode: string): Promise<UserInfo> {
    const accessToken = await this.getGithubAccessToken(authCode);

    const { data: userData } = await axios.get(GITHUB_API_URL + 'user', {
      headers: { Authorization: `token ${accessToken}` },
    });

    const { data: emailData } = await axios.get(
      GITHUB_API_URL + 'user/emails',
      {
        headers: { Authorization: `token ${accessToken}` },
      },
    );

    return {
      id: userData.id,
      email: emailData[0].email,
    };
  }

  private async getGithubAccessToken(code: string): Promise<string> {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    };

    const { data: tokenData } = await axios.post(GITHUB_TOKEN_URL, body, {
      headers: { Accept: 'application/json' },
    });

    if (tokenData.error)
      throw new HttpException('The code is incorrect or expired', 401);

    return tokenData['access_token'];
  }
}
