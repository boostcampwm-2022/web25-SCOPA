import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const detailProfileWrapperStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  gap: COMMON_SIZE.GRID_GAP,
  flex: 1,
  paddingLeft: COMMON_SIZE.COMMON_PAGE_PADDING_HORIZONTAL / 2,
  paddingRight: COMMON_SIZE.COMMON_PAGE_PADDING_HORIZONTAL / 2,
});

export const nicknameEditorInputStyle = css({
  border: 'none',
  borderRadius: COMMON_SIZE.EDITOR_BOX_INPUT_BORDER_RADIUS,
  height: COMMON_SIZE.EDITOR_BOX_INPUT_HEIGHT - 2,
  padding: '1px 5px',
});

export const nicknameSpanStyle = css({
  color: COLORS.TEXT_1,
  fontWeight: 700,
  fontSize: FONT_SIZE.LARGE,
});

export const editButtonStyle = css({
  '> svg': {
    width: COMMON_SIZE.SELECT_BOX_HEIGHT,
    height: COMMON_SIZE.SELECT_BOX_HEIGHT,
    fill: COLORS.WHITE,
  },
});

export const cancelButtonStyle = css({
  '> svg': {
    width: COMMON_SIZE.SELECT_BOX_HEIGHT,
    height: COMMON_SIZE.SELECT_BOX_HEIGHT,
    fill: COLORS.WHITE,
  },

  ' path': {
    stroke: COLORS.WHITE,
  },

  ' path:nth-of-type(1)': {
    fill: 'none',
    stroke: 'none',
  },
});

export const validateButtonStyle = css({
  backgroundColor: COLORS.SECONDARY_1,
  height: COMMON_SIZE.SELECT_BOX_HEIGHT,
  marginLeft: 10,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
});
