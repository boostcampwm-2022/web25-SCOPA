import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const loginButtonLinkStyle = css({
  marginTop: 30,
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
    padding: `15px 50px`,

    '> svg': {
      width: 30,
      height: 30,
    },
  });

export const loginButtonTextStyle = (isBackgroundBlack: boolean) =>
  css({
    color: isBackgroundBlack ? COLORS.WHITE : COLORS.BLACK,
    fontSize: FONT_SIZE.LARGE,
    fontStyle: 'normal',
    margin: `0 20px`,
  });

export const loginButtonDummyDivStyle = css({
  width: 30,
  height: 30,
});
