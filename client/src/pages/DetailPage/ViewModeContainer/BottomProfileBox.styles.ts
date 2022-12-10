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
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const DescriptionListStyle = css({
  flex: 1,
  display: 'grid',
  gridTemplateRows: 'minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr)',
  gap: 5,
  overflow: 'hidden',

  '> h4': {
    display: 'flex',
    alignItems: 'center',
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 600,
    color: COLORS.TEXT_1,
  },

  '> span': {
    display: 'inline-block',
    overflowX: 'hidden',
    overflowY: 'scroll',
    color: COLORS.TEXT_1,
    lineHeight: `${COMMON_SIZE.EDITOR_BOX_INPUT_HEIGHT}px`,
  },
});
