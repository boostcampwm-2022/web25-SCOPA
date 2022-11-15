import { css } from '@emotion/react';
import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const registerPageWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
});

export const registerPageInnerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: COMMON_SIZE.LOGIN_BOX_WIDTH,
  padding: COMMON_SIZE.LOGIN_BOX_PADDING,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.SECONDARY_1,
});

export const registerPageHeaderStyle = css({
  fontSize: FONT_SIZE.LARGE,
  color: COLORS.TEXT_1,
  textAlign: 'center',
  marginBottom: 2,
});

export const registerPageInputWrapperStyle = css({
  height: 40,
  width: 400,
  display: 'flex',
  marginBottom: 10,
});

export const registerPageIdInputStyle = css({
  backgroundColor: COLORS.SECONDARY_2,
  border: 'transparent',
  width: 300,
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.LARGE,
  padding: 5,
});

export const registerPageIdButtonStyle = css({
  backgroundColor: COLORS.PRIMARY_2,
  color: COLORS.SECONDARY_2,
  fontSize: FONT_SIZE.LARGE,
  border: 'transparent',
  width: 100,
});

export const regitserPageIconStyle = css({
  backgroundColor: COLORS.PRIMARY_2,
  color: COLORS.SECONDARY_2,
  height: 50,
});

export const registerPageSelectedStyle = css({
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.LARGE,
});

export const registerPageButtonStyle = css({
  backgroundColor: COLORS.PRIMARY_2,
  fontSize: FONT_SIZE.LARGE,
  border: 'transparent',
  fontWeight: 'bold',
  width: 400,
  height: 70,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
});
