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
  lineHeight: 1.5,
  marginBottom: 10,
});

export const registerPageInputWrapperStyle = css({
  height: 40,
  width: 400,
  display: 'flex',
  marginBottom: 10,
  marginTop: 10,
});

export const registerPageInputStyle = css({
  backgroundColor: COLORS.SECONDARY_2,
  border: 'transparent',
  width: 350,
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.LARGE,
  padding: 5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '::placeholder': {
    color: COLORS.TEXT_1,
  },
});

export const registerPageIdButtonStyle = css({
  backgroundColor: COLORS.PRIMARY_2,
  color: COLORS.SECONDARY_2,
  fontSize: FONT_SIZE.LARGE,
  border: 'transparent',
  width: 100,
});

export const registerInputArrowButtonStyle = css({
  backgroundColor: COLORS.PRIMARY_2,
  border: 'transparent',
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
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

export const selectedItemsStyle = css({
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.MEDIUM,
});

export const selectedItemButtonStyle = css({
  border: 'transparent',
  backgroundColor: 'transparent',
  fontSize: FONT_SIZE.SMALL,
  fontWeight: 'bold',
});
