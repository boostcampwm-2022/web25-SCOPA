import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const interestsBoxStyle = (topPosition: number) =>
  css({
    zIndex: 10,
    width: '100%',
    position: 'absolute',
    top: topPosition,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    border: `2px solid ${COLORS.PRIMARY_1}`,
    boxShadow: `0 5px 8px 3px ${COLORS.SHADOW}`,
  });

export const interestBoxInnerStyle = css({
  width: '100%',
  height: '100%',
  borderBottom: `1px solid ${COLORS.PRIMARY_1}`,

  ':last-child': { border: 'none' },
});

export const interestButtonStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  alignItems: 'center',
  lineHeight: 3,
  transition: `0.1s linear`,

  ' span': {
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.TEXT_1,
    userSelect: 'none',
  },

  ':hover': {
    backgroundColor: `${COLORS.PRIMARY_1}30`,
  },
});
