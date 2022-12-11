import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { MEDIA_QUERY } from 'styles/mediaQuery';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const messageListTitleStyle = css({
  padding: `10px 10px ${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px`,
  fontSize: FONT_SIZE.LARGE,
  borderBottom: `2px solid ${COLORS.BOX_BORDER}`,
});

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
