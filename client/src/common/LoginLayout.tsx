/** @jsxImportSource @emotion/react */

import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';

import { currentUserState } from 'store';
import { LINK } from 'utils/constants';

import { LOGO_SIZE, COMMON_SIZE } from 'styles/sizes';
import { COLORS } from 'styles/colors';
import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';

export const LoginLayout = () => {
  const currentUser = useRecoilValue(currentUserState);
  const nav = useNavigate();

  useEffect(() => {
    if (currentUser.id) nav(LINK.MAIN);
  }, [currentUser]);

  return (
    <div css={loginPageBackgroundStyle}>
      <div css={loginPageWrapperStyle}>
        <div css={loginPageInnerStyle}>
          <img
            width={LOGO_SIZE.LOGIN_LOGO_WIDTH}
            height={LOGO_SIZE.LOGIN_LOGO_HEIGHT}
            src='/logo.png'
            alt='scopa logo'
            css={loginPageHeaderImageStyle}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const loginPageBackgroundStyle = css({
  backgroundImage: `url('./loginBG.jpg')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh',
});

const loginPageWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backdropFilter: `blur(15px) brightness(200%) contrast(50%)`,
});

const loginPageInnerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90vw',
  height: 'fit-content',
  padding: 20,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.WHITE,
  boxShadow: `0 0 10px 10px ${COLORS.SHADOW}`,

  [getMediaQuery(MEDIA_QUERY.SM)]: {
    width: 540,
    padding: 40,
  },
});

const loginPageHeaderImageStyle = css({
  marginBottom: 15,
  width: 160,
});
