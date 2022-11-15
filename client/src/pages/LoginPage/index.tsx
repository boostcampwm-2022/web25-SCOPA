/** @jsxImportSource @emotion/react */

import { LoginButtonComponent } from './LoginButtonComponent';

import {
  loginPageBackgroundStyle,
  loginPageHeaderStyle,
  loginPageHeaderWrapperStyle,
  loginPageInnerStyle,
  loginPageLogoImageStyle,
  loginPageSubHeaderStyle,
  loginPageWrapperStyle,
} from './styles';

import { GithubIcon, GoogleIcon } from 'assets/svgs';

export const LoginPage = () => {
  return (
    <div css={loginPageBackgroundStyle}>
      <div css={loginPageWrapperStyle}>
        <div css={loginPageInnerStyle}>
          <div css={loginPageHeaderWrapperStyle}>
            {/* 로고로 교체 예정 */}
            <img src='/earlybird.png' alt='team earlybird' css={loginPageLogoImageStyle} />
            <h1 css={loginPageHeaderStyle}>SCOPA</h1>
            <img src='/earlybird.png' alt='team earlybird' css={loginPageLogoImageStyle} />
          </div>
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
        </div>
      </div>
    </div>
  );
};
