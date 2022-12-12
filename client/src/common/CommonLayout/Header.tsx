/** @jsxImportSource @emotion/react */

import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { fetchLogout } from 'services';
import { currentUserState } from 'store';
import { LINK } from 'utils/constants';

import { LOGO_SIZE } from 'styles/sizes';
import { headerButtonStyle, headerButtonWrapperStyle, navigationBarWrapperStyle } from './Header.styles';

export const Header = () => {
  const currentUser = useRecoilValue(currentUserState);
  const resetCurrentUser = useResetRecoilState(currentUserState);
  const nav = useNavigate();
  const location = useLocation();

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
  }, []);

  const handleClickMypage = useCallback(() => {
    nav(LINK.MYPAGE);
  }, []);

  const handleClickSettings = useCallback(() => {
    nav(LINK.SETTINGS);
  }, []);

  const handleClickMessage = useCallback(() => {
    nav(LINK.MESSAGE);
  }, []);

  return (
    <header css={navigationBarWrapperStyle}>
      <button type='button' onClick={handleClickLogo}>
        <img width={LOGO_SIZE.MAIN_LOGO_WIDTH} height={LOGO_SIZE.MAIN_LOGO_HEIGHT} src='/logo.png' alt='scopa logo' />
      </button>
      <div css={headerButtonWrapperStyle}>
        <button
          type='button'
          css={headerButtonStyle(location.pathname === LINK.SETTINGS)}
          onClick={handleClickSettings}
        >
          <span>환경설정</span>
        </button>
        {currentUser.id && (
          <>
            <button
              type='button'
              css={headerButtonStyle(location.pathname === LINK.MYPAGE)}
              onClick={handleClickMypage}
            >
              <span>마이페이지</span>
            </button>
            <button
              type='button'
              css={headerButtonStyle(location.pathname === LINK.MESSAGE)}
              onClick={handleClickMessage}
            >
              <span>쪽지</span>
            </button>
          </>
        )}
        <button type='button' css={headerButtonStyle(false)} onClick={handleClickLogin}>
          <span>{currentUser.id ? '로그아웃' : '로그인'}</span>
        </button>
      </div>
    </header>
  );
};
