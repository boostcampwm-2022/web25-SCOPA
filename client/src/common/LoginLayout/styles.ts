import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const loginPageBackgroundStyle = css({
  backgroundImage: `url('./loginBG.jpg')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh',
});

export const loginPageWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backdropFilter: `blur(15px) brightness(200%) contrast(50%)`,
});

export const loginPageInnerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: COMMON_SIZE.LOGIN_BOX_WIDTH,
  height: COMMON_SIZE.LOGIN_BOX_HEIGHT,
  padding: COMMON_SIZE.LOGIN_BOX_PADDING,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.WHITE,
  boxShadow: `0 0 10px 10px ${COLORS.SHADOW}`,
});

export const loginPageHeaderImageStyle = css({
  marginBottom: 15,
  width: 160,
});
