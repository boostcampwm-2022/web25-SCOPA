import axios from 'axios';
import { Injectable } from '@nestjs/common';

import { UserInfo } from 'src/d';
import { errors } from 'common/response/error-response';

@Injectable()
export class AuthService {
  readonly GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
  readonly GOOGLE_REDIRECT_URL = `${process.env.SERVER_URL}/api/auth/google-callback`;
  readonly GOOGLE_INFO_URL = `https://www.googleapis.com/oauth2/v3/userinfo`;

  readonly GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
  readonly GITHUB_API_URL = 'https://api.github.com/';

  async getGoogleInfo(authCode: string): Promise<UserInfo> {
    const accessToken = await this.getGoogleAccessToken(authCode);

    const { data: userData } = await axios.get(
      `${this.GOOGLE_INFO_URL}?access_token=${accessToken}`,
    );

    return {
      authProvider: 'google',
      authId: userData.sub,
      email: userData.email,
    };
  }

  private async getGoogleAccessToken(code: string): Promise<string> {
    const { data: tokenData } = await axios({
      method: 'POST',
      url: this.GOOGLE_TOKEN_URL,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code', //특정 스트링
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: this.GOOGLE_REDIRECT_URL,
        code: code,
      },
    });

    if (tokenData.error) throw errors.INVALID_AUTH_CODE;

    return tokenData['access_token'];
  }

  async getGithubInfo(authCode: string): Promise<UserInfo> {
    const accessToken = await this.getGithubAccessToken(authCode);

    const { data: userData } = await axios.get(this.GITHUB_API_URL + 'user', {
      headers: { Authorization: `token ${accessToken}` },
    });

    const { data: emailData } = await axios.get(
      this.GITHUB_API_URL + 'user/emails',
      {
        headers: { Authorization: `token ${accessToken}` },
      },
    );

    return {
      authProvider: 'github',
      authId: String(userData.id),
      email: emailData[0].email,
    };
  }

  private async getGithubAccessToken(code: string): Promise<string> {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    };

    const { data: tokenData } = await axios.post(this.GITHUB_TOKEN_URL, body, {
      headers: { Accept: 'application/json' },
    });

    if (tokenData.error) throw errors.INVALID_AUTH_CODE;

    return tokenData['access_token'];
  }
}
