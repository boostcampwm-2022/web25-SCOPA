/** @jsxImportSource @emotion/react */

import { LoginButtonComponent } from './LoginButtonComponent';
import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

import { GithubIcon, GoogleIcon } from 'assets/svgs';

export const LoginPage = () => {
  return (
    <>
      <h3 css={loginPageSubHeaderStyle}>나와 찰떡궁합인 팀원 찾기</h3>
      <LoginButtonComponent
        link={process.env.REACT_APP_GITHUB_OAUTH as string}
        icon={<GithubIcon />}
        innerText='Github'
        isBackgroundBlack
      />
      <LoginButtonComponent
        link={process.env.REACT_APP_GOOGLE_OAUTH as string}
        icon={<GoogleIcon />}
        innerText='Google'
      />
    </>
  );
};

const loginPageSubHeaderStyle = css({
  fontSize: FONT_SIZE.MEDIUM,
  color: COLORS.TEXT_1,
  textAlign: 'center',
  marginBottom: 10,
});
