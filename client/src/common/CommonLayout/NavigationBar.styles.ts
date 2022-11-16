import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const navigationBarWrapperStyle = css({
  width: '100%',
  backgroundColor: COLORS.PRIMARY_2,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${COMMON_SIZE.TITLE_BAR_PADDING_VERTICAL}px ${COMMON_SIZE.TITLE_BAR_PADDING_HORIZONTAL}px`,

  '> h1': {
    fontSize: FONT_SIZE.TITLE_48,
    color: COLORS.TEXT_1,
    userSelect: 'none',
  },
});

export const logoutButtonStyle = css({
  border: 'none',
  backgroundColor: 'transparent',

  '> span': {
    color: COLORS.TEXT_1,
    fontSize: FONT_SIZE.MEDIUM,
    userSelect: 'none',
  },

  ':hover': {
    cursor: 'pointer',
  },
});
