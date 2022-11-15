import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const techStackBoxWrapper = css({
  position: 'absolute',
  display: 'grid',
  marginTop: COMMON_SIZE.POPOVER_MARGIN_TOP,
  width: 480,
  height: 320,
  gridTemplateColumns: 'repeat(3, 1fr)',
  backgroundColor: COLORS.SECONDARY_2,
  border: `${COMMON_SIZE.POPOVER_BORDER}px solid ${COLORS.PRIMARY_1}`,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  padding: COMMON_SIZE.POPOVER_PADDING,
});
