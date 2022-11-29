import { css, keyframes } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

const animation = keyframes`
from {
  transform: skewX(30deg) translateX(-35px);
} to {
  transform: skewX(30deg) translateX(200px);
}`;

export const interestStyle = (bgColor: string, borderColor: string) =>
  css({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    width: 100,
    height: 32,
    borderRadius: 5,
    backgroundColor: bgColor,
    overflow: 'hidden',
    border: `1px solid ${borderColor}`,

    '::before': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 30,
      height: '100%',
      backgroundColor: COLORS.WHITE,
      opacity: 0.5,
      content: '""',
      transform: 'skewX(30deg) translateX(-35px)',
      animation: `${animation} 2s ease infinite`,
    },

    ' span': {
      fontSize: FONT_SIZE.MEDIUM,
      color: COLORS.WHITE,
      fontWeight: 600,
      userSelect: 'none',
    },
  });
