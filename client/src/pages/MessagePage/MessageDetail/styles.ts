import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';

export const goBackButtonStyle = css({
  padding: 0,
  width: 20,
  height: 20,
  marginRight: 10,

  ' svg': {
    width: 20,
    height: 20,
    transform: 'rotateZ(90deg)',
    fill: COLORS.PRIMARY_2,
  },
});
