import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const profileBoxWrapperStyle = css({
  backgroundColor: COLORS.SECONDARY_1,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  padding: `${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px ${COMMON_SIZE.PROFILE_BOX_PADDING_HORIZONTAL}px`,
  gridRow: '2 / 4',
  gridColumn: '2',
});

export const subtitleStyle = css({
  fontSize: FONT_SIZE.TITLE_24,
  fontStyle: 'italic',
  fontWeight: 600,
  marginBottom: COMMON_SIZE.PROFILE_BOX_DD_MARGIN_BOTTOM,
  color: COLORS.TEXT_1,

  '::before': {
    content: `'#'`,
    marginRight: 10,
  },
});

export const DescriptionListStyle = css({
  display: 'flex',
  flexDirection: 'column',

  '> dt': {
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 600,
    color: COLORS.TEXT_1,
    marginBottom: COMMON_SIZE.PROFILE_BOX_DT_MARGIN_BOTTOM,
  },

  '> dd': {
    color: COLORS.TEXT_1,
    marginBottom: COMMON_SIZE.PROFILE_BOX_DD_MARGIN_BOTTOM,
  },
});
