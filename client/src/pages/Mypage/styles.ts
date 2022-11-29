import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const detailProfileWrapperStyle = css({
  display: 'grid',
  marginBottom: 20,
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  gap: 30,
  flex: 1,
  paddingLeft: 30,
  paddingRight: 30,
});

export const nicknameEditorInputStyle = css({
  border: 'none',
  borderBottom: `1px solid ${COLORS.PRIMARY_2}`,
  fontSize: FONT_SIZE.LARGE,
  color: COLORS.TEXT_1,
});

export const nicknameSpanStyle = css({
  color: COLORS.TEXT_1,
  fontWeight: 700,
  fontSize: FONT_SIZE.LARGE,
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

export const buttonWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
});
