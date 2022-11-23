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
