import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';

export const miniNavBarWrapper = css({
  backgroundColor: COLORS.WHITE,
  padding: `15px 20px`,
  marginBottom: 20,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
