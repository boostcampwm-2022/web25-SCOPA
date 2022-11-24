import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const techStackWrapperStyle = css({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: COLORS.WHITE,
  height: COMMON_SIZE.EDITOR_BOX_INPUT_HEIGHT,
  border: 'none',
  paddingLeft: 5,
  borderRadius: COMMON_SIZE.EDITOR_BOX_INPUT_BORDER_RADIUS,

  '> div path:nth-of-type(1)': {
    fill: 'none',
  },
});

export const popoverButtonStyle = css({
  backgroundColor: COLORS.PRIMARY_3,
  height: COMMON_SIZE.EDITOR_BOX_INPUT_HEIGHT,
  borderBottomRightRadius: COMMON_SIZE.EDITOR_BOX_INPUT_BORDER_RADIUS,
  borderTopRightRadius: COMMON_SIZE.EDITOR_BOX_INPUT_BORDER_RADIUS,

  ' svg': {
    fill: COLORS.WHITE,
    height: '100%',
  },
});
