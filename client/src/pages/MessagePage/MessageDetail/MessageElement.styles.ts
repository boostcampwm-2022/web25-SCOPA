import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const messageElementWrapperStyle = (isMine: boolean) =>
  css({
    padding: `0 10px`,
    width: '100%',
    display: 'flex',
    flexDirection: isMine ? 'row-reverse' : 'row',
    alignItems: 'flex-end',
    marginBottom: 10,

    '&:last-of-type': {
      marginBottom: 0,
    },
  });

export const messageBubbleStyle = css({
  width: '70%',
  padding: `8px 15px`,
  backgroundColor: COLORS.WHITE,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,

  ' span': {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
  },
});

export const messageTimeStyle = css({
  marginLeft: 10,
  fontSize: FONT_SIZE.SMALL,
  color: COLORS.DARK,
});
