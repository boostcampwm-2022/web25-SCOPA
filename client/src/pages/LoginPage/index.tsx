/** @jsxImportSource @emotion/react */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { LoginButtonComponent } from './LoginButtonComponent';

import {
  loginPageHeaderStyle,
  loginPageHeaderWrapperStyle,
  loginPageLogoImageStyle,
  loginPageSubHeaderStyle,
} from './styles';

import { GithubIcon, GoogleIcon } from 'assets/svgs';
import { currentUserState } from 'store';

export const LoginPage = () => {
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.id !== null) navigate('/'); // 로그인이 되어 있을 경우, 메인 페이지로 리디렉션
  }, [currentUser]);

  return (
    <>
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
    </>
  );
};
