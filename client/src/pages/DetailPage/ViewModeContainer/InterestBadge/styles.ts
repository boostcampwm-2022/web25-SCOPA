import { css, keyframes } from '@emotion/react';

import { INTEREST_COLOR_BASE, INTEREST_COLOR_BORDER } from 'utils/constants';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

const animation = keyframes`
from {
  transform: skewX(30deg) translateX(-400%);
} to {
  transform: skewX(30deg) translateX(600%);
}`;

export const interestStyle = (interest: string) =>
  css({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 10px`,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: INTEREST_COLOR_BASE[interest],
    overflow: 'hidden',
    border: `1px solid ${INTEREST_COLOR_BORDER[interest]}`,

    '::before': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '20%',
      height: '100%',
      backgroundColor: COLORS.WHITE,
      opacity: 0.5,
      content: '""',
      transform: 'skewX(30deg) translateX(30px)',
      animation: `${animation} 2s ease infinite`,
    },

    ' span': {
      width: '100%',
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: FONT_SIZE.LARGE,
      color: COLORS.WHITE,
      fontWeight: 600,
      userSelect: 'none',
    },
  });
