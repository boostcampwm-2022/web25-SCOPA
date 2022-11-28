import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const interestWrapperStyle = css({
  display: 'flex',
  position: 'relative',
  width: '50%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: COLORS.WHITE,
  height: COMMON_SIZE.EDITOR_BOX_INPUT_HEIGHT,
  border: 'none',
  paddingLeft: 5,
  borderRadius: COMMON_SIZE.EDITOR_BOX_INPUT_BORDER_RADIUS,
  marginBottom: COMMON_SIZE.PROFILE_BOX_DD_MARGIN_BOTTOM,

  ' span': {
    color: COLORS.TEXT_1,
  },
});

export const popoverButtonStyle = css({
  backgroundColor: COLORS.DARK,
  height: COMMON_SIZE.EDITOR_BOX_INPUT_HEIGHT,
  borderBottomRightRadius: COMMON_SIZE.EDITOR_BOX_INPUT_BORDER_RADIUS,
  borderTopRightRadius: COMMON_SIZE.EDITOR_BOX_INPUT_BORDER_RADIUS,

  ' svg': {
    height: '100%',
  },
});
