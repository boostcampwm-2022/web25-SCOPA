import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const messageListElementStyle = (isSelected: boolean) =>
  css({
    backgroundColor: isSelected ? COLORS.PRIMARY_DIM : COLORS.WHITE,
    width: '100%',
    height: 'fit-content',
    borderBottom: `1px solid ${COLORS.BOX_BORDER}`,

    ':last-of-type': {
      borderBottom: 'none',
    },
  });

export const messageListButtonStyle = css({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  padding: `5px 10px`,

  ' span': {
    color: COLORS.TEXT_1,
    fontSize: FONT_SIZE.MEDIUM,
  },

  ':hover': {
    backgroundColor: COLORS.PRIMARY_DIM,
  },
});
