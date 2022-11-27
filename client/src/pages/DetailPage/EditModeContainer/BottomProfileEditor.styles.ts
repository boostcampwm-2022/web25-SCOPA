import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const profileBoxWrapperStyle = css({
  backgroundColor: COLORS.WHITE,
  border: `${COMMON_SIZE.LINE_WIDTH}px solid ${COLORS.BOX_BORDER}`,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  padding: `${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px ${COMMON_SIZE.PROFILE_BOX_PADDING_HORIZONTAL}px`,
  gridRow: '2 / 4',
  gridColumn: '2',
});

export const subtitleStyle = css({
  fontSize: FONT_SIZE.LARGE,
  fontStyle: 'italic',
  fontWeight: 600,
  marginBottom: COMMON_SIZE.PROFILE_BOX_DD_MARGIN_BOTTOM,
  color: COLORS.TEXT_1,

  '::before': {
    content: `'#'`,
    marginRight: 10,
  },
});

export const fieldsetStyle = css({
  display: 'flex',
  flexDirection: 'column',

  '> label': {
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 600,
    color: COLORS.TEXT_1,
    marginBottom: COMMON_SIZE.PROFILE_BOX_DT_MARGIN_BOTTOM,
  },

  ' input': {
    color: COLORS.TEXT_1,
    backgroundColor: COLORS.WHITE,
    height: COMMON_SIZE.EDITOR_BOX_INPUT_HEIGHT - 3,
    border: 'none',
    borderBottom: `1px solid ${COLORS.PRIMARY_2}`,
    padding: '1px 5px',
    marginBottom: COMMON_SIZE.PROFILE_BOX_DD_MARGIN_BOTTOM,
  },
});

export const requirementFieldWrapperStyle = css({
  '> input:nth-of-type(1)': {
    marginRight: 10,
  },
});
