/** @jsxImportSource @emotion/react */

import { LoginButtonComponent } from './LoginButtonComponent';

import {
  loginPageBackgroundStyle,
  loginPageHeaderStyle,
  loginPageInnerStyle,
  loginPageSubHeaderStyle,
  loginPageWrapperStyle,
} from './styles';

import { GithubIcon, GoogleIcon } from 'assets/svgs';

export const LoginPage = () => {
  return (
    <div css={loginPageBackgroundStyle}>
      <div css={loginPageWrapperStyle}>
        <div css={loginPageInnerStyle}>
          <h1 css={loginPageHeaderStyle}>SCOPA</h1>
          <h3 css={loginPageSubHeaderStyle}>나와 찰떡궁합인 팀원 찾기</h3>
          <LoginButtonComponent link='#' icon={<GithubIcon />} innerText='Github' isBackgroundBlack />
          <LoginButtonComponent link='#' icon={<GoogleIcon />} innerText='Google' />
        </div>
      </div>
    </div>
  );
};
