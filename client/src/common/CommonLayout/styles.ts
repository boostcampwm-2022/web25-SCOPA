import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const mainWrapperStyle = css({
  width: `calc(100% - ${COMMON_SIZE.COMMON_PAGE_PADDING_HORIZONTAL} * 2)`,
  flex: 1,
  padding: `${COMMON_SIZE.TITLE_BAR_BOTTOM_MARGIN}px ${COMMON_SIZE.COMMON_PAGE_PADDING_HORIZONTAL}px`,
});

export const footerStyle = css({
  width: '100%',
  height: 50,
  backgroundColor: COLORS.SECONDARY_2,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  '> img': {
    width: 20,
    height: 20,
    margin: '0 10px',
  },
});
