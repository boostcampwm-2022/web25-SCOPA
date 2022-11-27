import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const miniNavBarWrapper = css({
  backgroundColor: COLORS.WHITE,
  width: '100%',
  padding: `30px 80px`,
  marginBottom: 20,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: `${COMMON_SIZE.HEADER_SHADOW} ${COLORS.SHADOW}`,
});
