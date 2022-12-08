import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';

export const detailProfileWrapperStyle = css({
  display: 'grid',
  marginBottom: 20,
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  gap: 30,
  flex: 1,
  paddingLeft: 30,
  paddingRight: 30,
});
