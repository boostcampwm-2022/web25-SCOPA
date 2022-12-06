import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const tooltipWrapperStyle = css({
  position: 'absolute',
  width: 'fit-content',
  filter: `drop-shadow(0 0 3px ${COLORS.SHADOW})`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: 32,
});

export const tooltipInnerStyle = css({
  width: 'fit-content',
  whiteSpace: 'nowrap',
  backgroundColor: COLORS.WHITE,
  padding: 10,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
});
