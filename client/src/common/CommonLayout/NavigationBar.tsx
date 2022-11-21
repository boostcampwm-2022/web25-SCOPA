/** @jsxImportSource @emotion/react */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { currentUserState } from 'store';

import { logoButtonStyle, logoutButtonStyle, navigationBarWrapperStyle } from './NavigationBar.styles';

export const NavigationBar = () => {
  // const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  // TODO: setCurrentUser는 로그아웃 구현 시에 사용할 예정

  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  const handleClickLogin = useCallback(() => {
    if (!currentUser.id) navigate('/login');
  }, [currentUser.id]);

  const handleClickLogo = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <nav css={navigationBarWrapperStyle}>
      <button type='button' css={logoButtonStyle} onClick={handleClickLogo}>
        <h1>SCOPA</h1>
      </button>
      <button type='button' css={logoutButtonStyle} onClick={handleClickLogin}>
        <span>{currentUser.id ? '로그아웃' : '로그인'}</span>
      </button>
    </nav>
  );
};
