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
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: `blur(15px) brightness(200%) contrast(50%)`,
});

export const loginPageInnerStyle = css({
  width: COMMON_SIZE.LOGIN_BOX_WIDTH,
  height: COMMON_SIZE.LOGIN_BOX_HEIGHT,
  padding: COMMON_SIZE.LOGIN_BOX_PADDING,
  backgroundColor: COLORS.SECONDARY_1,
});
