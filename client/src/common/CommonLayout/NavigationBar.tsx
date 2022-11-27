/** @jsxImportSource @emotion/react */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { currentUserState } from 'store';

import { logoButtonStyle, headerButtonStyle, navigationBarWrapperStyle } from './NavigationBar.styles';

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

  const handleClickMypage = useCallback(() => {
    navigate('/mypage');
  }, []);

  return (
    <header css={navigationBarWrapperStyle}>
      <button type='button' css={logoButtonStyle} onClick={handleClickLogo}>
        <img src='/logo.png' alt='scopa logo' />
      </button>
      <div>
        {currentUser.id && (
          <button type='button' css={headerButtonStyle} onClick={handleClickMypage}>
            <span>마이페이지</span>
          </button>
        )}
        <button type='button' css={headerButtonStyle} onClick={handleClickLogin}>
          <span>{currentUser.id ? '로그아웃' : '로그인'}</span>
        </button>
      </div>
    </header>
  );
};
