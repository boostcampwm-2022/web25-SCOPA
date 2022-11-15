import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const loginPageHeaderStyle = css({
  fontSize: FONT_SIZE.TITLE_48,
  color: COLORS.TEXT_1,
  textAlign: 'center',
  marginBottom: 10,
});

export const loginPageSubHeaderStyle = css({
  loginPageHeaderStyle,
  fontSize: FONT_SIZE.LARGE,
});

export const loginPageHeaderWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

export const loginPageLogoImageStyle = css({
  width: 50,
});
