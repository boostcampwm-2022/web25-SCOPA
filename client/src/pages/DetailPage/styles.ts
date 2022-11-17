import { css } from '@emotion/react';

import { COMMON_SIZE } from 'styles/sizes';

export const detailProfileWrapperStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  gap: COMMON_SIZE.GRID_GAP,
  flex: 1,
  paddingLeft: COMMON_SIZE.COMMON_PAGE_PADDING_HORIZONTAL / 2,
  paddingRight: COMMON_SIZE.COMMON_PAGE_PADDING_HORIZONTAL / 2,
});
