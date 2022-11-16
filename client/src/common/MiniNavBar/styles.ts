import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const miniNavBarWrapper = css({
  backgroundColor: COLORS.PRIMARY_1,
  padding: `${COMMON_SIZE.SEARCH_BAR_PADDING_VERTICAL}px ${COMMON_SIZE.SEARCH_BAR_PADDING_HORIZONTAL}px`,
  borderRadius: COMMON_SIZE.SEARCH_BAR_BORDER_RADIUS,
  marginBottom: COMMON_SIZE.SEARCH_BAR_BOTTOM_MARGIN,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
