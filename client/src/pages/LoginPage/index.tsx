/** @jsxImportSource @emotion/react */

import { LoginButtonComponent } from './LoginButtonComponent';

import { loginPageHeaderWrapperStyle, loginPageSubHeaderStyle } from './styles';

import { GithubIcon, GoogleIcon } from 'assets/svgs';

export const LoginPage = () => {
  return (
    <>
      <div css={loginPageHeaderWrapperStyle}>
        <img src='/logo.png' alt='scopa logo' />
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
    </>
  );
};
