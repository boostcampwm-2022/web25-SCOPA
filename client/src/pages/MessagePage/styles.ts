import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const messageListWrapperStyle = css({
  marginBottom: 20,
  height: '69vh',
  paddingLeft: 30,
  paddingRight: 30,
});

export const messageListInnerStyle = css({
  width: '100%',
  height: '100%',
  backgroundColor: COLORS.WHITE,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  border: `1px solid ${COLORS.BOX_BORDER}`,
  padding: `${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px ${COMMON_SIZE.PROFILE_BOX_PADDING_HORIZONTAL}px`,
});
