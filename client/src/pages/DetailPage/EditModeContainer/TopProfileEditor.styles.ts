import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const profileBoxWrapperStyle = css({
  backgroundColor: COLORS.WHITE,
  border: `${COMMON_SIZE.LINE_WIDTH}px solid ${COLORS.BOX_BORDER}`,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  padding: `${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px ${COMMON_SIZE.PROFILE_BOX_PADDING_HORIZONTAL}px`,
  gridRow: '4 / 5',
  gridColumn: '1',

  [getMediaQuery(MEDIA_QUERY.LG)]: {
    gridRow: '1',
    gridColumn: '2',
  },
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

export const interestsStyle = css({
  marginBottom: 10,
});
