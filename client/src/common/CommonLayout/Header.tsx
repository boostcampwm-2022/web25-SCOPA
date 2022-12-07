/** @jsxImportSource @emotion/react */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { fetchLogout } from 'services';
import { currentUserState } from 'store';

import { logoButtonStyle, headerButtonStyle, navigationBarWrapperStyle } from './Header.styles';

export const Header = () => {
  const currentUser = useRecoilValue(currentUserState);
  const resetCurrentUser = useResetRecoilState(currentUserState);
  const navigate = useNavigate();

  const handleClickLogin = useCallback(() => {
    if (!currentUser.id) navigate('/login');
    else {
      fetchLogout().then((res) => {
        resetCurrentUser();
        navigate('/');
      }); // TODO: Refactor
    }
  }, [currentUser.id]);

  const handleClickLogo = useCallback(() => {
    navigate('/');
  }, []);

  const handleClickMypage = useCallback(() => {
    navigate('/mypage');
  }, []);

  const handleClickSettings = useCallback(() => {
    navigate('/settings');
  }, []);

  return (
    <header css={navigationBarWrapperStyle}>
      <button type='button' css={logoButtonStyle} onClick={handleClickLogo}>
        <img src='/logo.png' alt='scopa logo' />
      </button>
      <div>
        {currentUser.id && (
          <>
            <button type='button' css={headerButtonStyle} onClick={handleClickSettings}>
              <span>환경설정</span>
            </button>
            <button type='button' css={headerButtonStyle} onClick={handleClickMypage}>
              <span>마이페이지</span>
            </button>
          </>
        )}
        <button type='button' css={headerButtonStyle} onClick={handleClickLogin}>
          <span>{currentUser.id ? '로그아웃' : '로그인'}</span>
        </button>
      </div>
    </header>
  );
};
