import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';

export const mainWrapperStyle = css({
  width: `100%`,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: COLORS.SECONDARY_2,
});

export const footerStyle = css({
  width: '100%',
  height: 50,
  backgroundColor: COLORS.WHITE,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  '> img': {
    width: 20,
    height: 20,
    margin: '0 10px',
  },

  ' span': {
    color: COLORS.TEXT_1,
  },
});
