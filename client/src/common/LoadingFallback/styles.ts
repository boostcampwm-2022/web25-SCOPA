import { css } from '@emotion/react';
import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const loadingFallbackStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  ' img': {
    width: 100,
    height: 100,
  },
});

export const loadingTextStyle = css({
  marginTop: 20,
  fontWeight: 600,
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.LARGE,
});
