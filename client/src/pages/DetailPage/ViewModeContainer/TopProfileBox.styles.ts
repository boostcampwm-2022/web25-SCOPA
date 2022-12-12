import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const profileBoxWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: COLORS.WHITE,
  border: `${COMMON_SIZE.LINE_WIDTH}px solid ${COLORS.BOX_BORDER}`,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  padding: `${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px ${COMMON_SIZE.PROFILE_BOX_PADDING_HORIZONTAL}px`,
  gridRow: '1',
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

export const profileBoxInnerStyle = css({
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
  gap: 10,
});
