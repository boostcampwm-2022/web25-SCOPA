import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const loginButtonLinkStyle = css({
  marginTop: 20,

  [getMediaQuery(MEDIA_QUERY.SM)]: {
    marginTop: 30,
  },
});

export const loginButtonWrapperStyle = (isBackgroundBlack: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: isBackgroundBlack ? COLORS.BLACK : COLORS.WHITE,
    border: `3px solid ${COLORS.BLACK}`,
    borderRadius: COMMON_SIZE.BORDER_RADIUS,
    padding: `10px 20px`,

    '> svg': {
      width: 30,
      height: 30,
    },

    [getMediaQuery(MEDIA_QUERY.SM)]: {
      padding: `15px 50px`,
    },
  });

export const loginButtonTextStyle = (isBackgroundBlack: boolean) =>
  css({
    flex: 1,
    color: isBackgroundBlack ? COLORS.WHITE : COLORS.BLACK,
    fontSize: FONT_SIZE.MEDIUM,
    fontStyle: 'normal',
    margin: `0 10px`,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [getMediaQuery(MEDIA_QUERY.SM)]: {
      fontSize: FONT_SIZE.LARGE,
      margin: `0 20px`,
    },
  });

export const loginButtonDummyDivStyle = css({
  width: 30,
  height: 30,
});
