import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const checkboxWrapperStyle = css({
  display: 'flex',
  alignItems: 'center',
});

export const checkboxStyle = css({
  borderColor: COLORS.TEXT_1,
  width: COMMON_SIZE.CHECKBOX_SIZE,
  height: COMMON_SIZE.CHECKBOX_SIZE,
  marginRight: 15,

  ':hover': {
    cursor: 'pointer',
  },
});
