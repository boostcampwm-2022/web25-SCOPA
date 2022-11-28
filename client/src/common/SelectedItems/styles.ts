import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const selectedItemsStyle = css({
  width: '100%',
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.MEDIUM,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflow: 'scroll',
});

export const selectedItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginRight: 10,

  ' span': {
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.TEXT_1,
    marginRight: 5,
  },
});

export const selectedItemButtonStyle = css({
  width: 15,
  height: 15,
  padding: 0,

  ' svg': {
    width: 15,
    height: 15,
    stroke: COLORS.DARK,
  },
});
