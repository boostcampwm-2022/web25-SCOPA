import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const navigationBarWrapperStyle = css({
  width: '100%',
  zIndex: 2,
  backgroundColor: COLORS.WHITE,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `20px 50px`,
  borderBottom: `2px solid ${COLORS.PRIMARY_DIM}`,
});

export const logoButtonStyle = css({
  '> img': {
    width: 120,
  },
});

export const headerButtonStyle = css({
  width: 100,
  height: 30,
  transition: '0.2s linear',
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  '> span': {
    color: COLORS.TEXT_1,
    fontSize: FONT_SIZE.MEDIUM,
    userSelect: 'none',
  },

  ':hover': {
    backgroundColor: COLORS.PRIMARY_DIM,
  },

  '&:nth-of-type(1)': {
    marginRight: 5,
  },
});
