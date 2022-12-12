import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

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

export const messageDetailListStyle = css({
  width: '100%',
  flex: 1,
  padding: '10px 0',
  backgroundColor: COLORS.LIGHT,
  overflowX: 'hidden',
  overflowY: 'scroll',
});

export const messageDetailInputWrapperStyle = css({
  width: '100%',
  height: 60,
  padding: '0 10px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const messageInputStyle = css({
  flex: 1,
  marginRight: 20,
  padding: '10px 10px',
  border: `1px solid ${COLORS.BOX_BORDER}`,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
});
