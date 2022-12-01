import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const techStackBoxWrapperStyle = (topPosition: number) =>
  css({
    position: 'absolute',
    top: topPosition,
    zIndex: 10,
    left: 0,
    width: '100%',
    height: 240,
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE,
    border: `2px solid ${COLORS.PRIMARY_1}`,
    borderRadius: COMMON_SIZE.BORDER_RADIUS,
    boxShadow: `0 5px 8px 3px ${COLORS.SHADOW}`,
  });

export const listWrapperStyle = css({
  width: '100%',
  height: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${COLORS.PRIMARY_1}`,

  ':last-child': { border: 'none' },
});

export const listButtonStyle = (isSelected: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: COLORS.TEXT_1,
    padding: `15px 10px`,
    transition: `0.1s linear`,
    backgroundColor: isSelected ? COLORS.LIGHT : 'none',

    ':hover': {
      cursor: 'pointer',
      backgroundColor: isSelected ? COLORS.LIGHT : COLORS.PRIMARY_DIM,
    },

    ' svg': {
      width: 20,
      height: FONT_SIZE.MEDIUM,
      fill: COLORS.PRIMARY_2,
    },

    ' div': {
      width: 20,
      height: FONT_SIZE.MEDIUM,
    },

    ' span': {
      fontSize: FONT_SIZE.MEDIUM,
      color: COLORS.TEXT_1,
      userSelect: 'none',
    },
  });
