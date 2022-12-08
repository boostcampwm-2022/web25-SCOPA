import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const codeBoxListStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  overflowX: 'scroll',
  overflowY: 'hidden',
});

export const codeListElementStyle = (isSelected: boolean) =>
  css({
    textAlign: 'start',
    padding: 0,
    height: 'fit-content',
    borderRadius: COMMON_SIZE.BORDER_RADIUS,
    marginRight: 10,
    border: isSelected ? `3px solid ${COLORS.PRIMARY_1}` : `1px solid ${COLORS.BOX_BORDER}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '> span': {
      marginTop: 10,
      marginBottom: 5,
      fontSize: FONT_SIZE.MEDIUM,
      fontStyle: 'italic',
      color: COLORS.TEXT_2,
    },
  });
