import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const loginPageSubHeaderStyle = css({
  fontSize: FONT_SIZE.MEDIUM,
  color: COLORS.TEXT_1,
  textAlign: 'center',
  marginBottom: 10,
});

export const loginPageHeaderWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 15,

  ' img': {
    width: 160,
  },
});
