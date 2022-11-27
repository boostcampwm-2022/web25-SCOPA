import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';

export const miniNavBarWrapper = css({
  backgroundColor: COLORS.WHITE,
  width: '100%',
  padding: `30px 80px`,
  marginBottom: 20,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: `1px 3px 10px 1px ${COLORS.SHADOW}`,
});
