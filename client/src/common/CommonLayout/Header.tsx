/** @jsxImportSource @emotion/react */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { fetchLogout } from 'services';
import { currentUserState } from 'store';
import { LINK } from 'utils/constants';

import { LOGO_SIZE } from 'styles/sizes';
import { headerButtonStyle, navigationBarWrapperStyle } from './Header.styles';

export const Header = () => {
  const currentUser = useRecoilValue(currentUserState);
  const resetCurrentUser = useResetRecoilState(currentUserState);
  const nav = useNavigate();

  const handleClickLogin = useCallback(() => {
    if (!currentUser.id) nav(LINK.LOGIN);
    else {
      fetchLogout()
        .then(() => {
          resetCurrentUser();
          nav(LINK.MAIN);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [currentUser.id]);

  const handleClickLogo = useCallback(() => {
    window.location.replace('/');
    window.location.reload();
  }, []);

  const handleClickMypage = useCallback(() => {
    nav(LINK.MYPAGE);
  }, []);

  const handleClickSettings = useCallback(() => {
    nav(LINK.SETTINGS);
  }, []);

  return (
    <header css={navigationBarWrapperStyle}>
      <button type='button' onClick={handleClickLogo}>
        <img width={LOGO_SIZE.MAIN_LOGO_WIDTH} height={LOGO_SIZE.MAIN_LOGO_HEIGHT} src='/logo.png' alt='scopa logo' />
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
