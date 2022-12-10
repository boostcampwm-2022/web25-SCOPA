import { css } from '@emotion/react';

import { VALIDATION_RESULT } from 'utils/constants';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const inputWrapperStyle = css({
  position: 'relative',
});

export const usernameEditorInputStyle = css({
  border: 'none',
  width: 150,
  borderBottom: `1px solid ${COLORS.PRIMARY_2}`,
  fontSize: FONT_SIZE.LARGE,
  color: COLORS.TEXT_1,
  paddingRight: 30,
});

export const errorIconWrapperStyle = (validationType: number) =>
  css({
    display: validationType === VALIDATION_RESULT.NULL ? 'none' : 'block',
    position: 'absolute',
    zIndex: 2,
    top: 3,
    left: 157.5,

    '> svg': {
      width: 20,
      height: 20,
      fill: validationType === VALIDATION_RESULT.SUCCESS ? COLORS.SUCCESS : COLORS.FAILURE,
    },
  });

export const validateButtonStyle = css({
  backgroundColor: COLORS.WHITE,
  border: `1px solid ${COLORS.PRIMARY_2}`,
  height: 32,
  marginLeft: 10,

  ' span': {
    color: COLORS.PRIMARY_2,
  },

  ':hover': {
    backgroundColor: COLORS.PRIMARY_DIM,
  },
});

export const editButtonStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 32,

  ' svg': {
    width: 22,
    height: 22,
    marginRight: 10,
    fill: COLORS.WHITE,
  },
});

export const cancelButtonStyle = css({
  backgroundColor: COLORS.WHITE,
  marginRight: 20,
  border: `1px solid ${COLORS.PRIMARY_2}`,
  height: 32,

  '> svg': {
    width: 20,
    height: 20,
    stroke: COLORS.PRIMARY_2,
  },

  ':hover': {
    backgroundColor: COLORS.PRIMARY_DIM,
  },
});

export const buttonWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
});
