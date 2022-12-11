import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const navigationBarWrapperStyle = css({
  width: '100%',
  zIndex: 2,
  backgroundColor: COLORS.WHITE,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `20px 30px 10px`,
  borderBottom: `2px solid ${COLORS.PRIMARY_DIM}`,

  '> button': {
    height: 30,
    padding: 0,
  },

  [getMediaQuery(MEDIA_QUERY.MD)]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `20px 50px`,
  },
});

export const headerButtonWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 20,
  width: '100%',

  [getMediaQuery(MEDIA_QUERY.MD)]: {
    marginTop: 0,
    width: 'fit-content',
  },
});

export const headerButtonStyle = css({
  width: 80,
  height: 30,
  transition: '0.2s linear',
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  marginRight: 5,

  '> span': {
    color: COLORS.TEXT_1,
    fontSize: FONT_SIZE.SMALL,
    userSelect: 'none',
  },

  ':hover': {
    backgroundColor: COLORS.PRIMARY_DIM,
  },

  '&:last-of-type': {
    marginRight: 0,
  },

  [getMediaQuery(MEDIA_QUERY.MD)]: {
    width: 100,

    '> span': {
      fontSize: FONT_SIZE.MEDIUM,
    },
  },
});
