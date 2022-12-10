import { css } from '@emotion/react';

import { INTEREST_COLOR_BASE, INTEREST_COLOR_BORDER } from 'utils/constants';

import { FONT_SIZE } from 'styles/sizes';
import { COLORS } from 'styles/colors';

export const interestTagStyle = () =>
  css({
    position: 'absolute',
    top: -15,
    left: 0,
    zIndex: 2,
  });

export const interestTagInnerStyle = (interest: string) =>
  css({
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ' span': {
      position: 'absolute',
      zIndex: 3,
      textAlign: 'center',
      fontSize: FONT_SIZE.MEDIUM,
      color: COLORS.WHITE,
      userSelect: 'none',
      fontWeight: 600,
    },

    ' svg': {
      width: 70,
      height: 70,
      filter: `drop-shadow(0 0 1px ${INTEREST_COLOR_BORDER[interest]})`,
      fill: INTEREST_COLOR_BASE[interest],
    },
  });
