import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const profileBoxWrapperStyle = css({
  backgroundColor: COLORS.PRIMARY_1,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  padding: `${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px ${COMMON_SIZE.PROFILE_BOX_PADDING_HORIZONTAL}px`,
  gridRow: '1',
  gridColumn: '2',
});

export const fieldsetStyle = css({
  display: 'flex',
  flexDirection: 'column',

  '> label': {
    fontSize: FONT_SIZE.LARGE,
    fontStyle: 'italic',
    fontWeight: 600,
    color: COLORS.TEXT_1,
    marginBottom: COMMON_SIZE.PROFILE_BOX_DT_MARGIN_BOTTOM,
  },

  '> label::before': {
    content: `'#'`,
    marginRight: 10,
  },

  '> input': {
    color: COLORS.TEXT_1,
    backgroundColor: COLORS.WHITE,
    height: COMMON_SIZE.EDITOR_BOX_INPUT_HEIGHT - 2,
    border: 'none',
    padding: '1px 5px',
    borderRadius: COMMON_SIZE.EDITOR_BOX_INPUT_BORDER_RADIUS,
  },

  '> input:nth-of-type(1)': {
    marginBottom: COMMON_SIZE.PROFILE_BOX_DD_MARGIN_BOTTOM,
  },
});
