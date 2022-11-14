import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const loginButtonWrapperStyle = (isBackgroundBlack: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 360,
    backgroundColor: isBackgroundBlack ? COLORS.BLACK : COLORS.WHITE,
    borderRadius: COMMON_SIZE.BORDER_RADIUS,
    marginTop: 30,
    padding: `15px 50px`,

    '> svg': {
      width: 40,
      height: 40,
    },
  });

export const loginButtonTextStyle = (isBackgroundBlack: boolean) =>
  css({
    color: isBackgroundBlack ? COLORS.WHITE : COLORS.BLACK,
    fontSize: FONT_SIZE.LARGE,
    fontStyle: 'normal',
  });

export const loginButtonDummyDivStyle = css({
  width: 40,
  height: 40,
});
