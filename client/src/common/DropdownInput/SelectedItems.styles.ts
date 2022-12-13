import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const selectedItemsStyle = css({
  width: '100%',
  color: COLORS.TEXT_1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: 5,
  overflowX: 'scroll',
  overflowY: 'hidden',
});

export const selectedItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginRight: 10,

  ' span': {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_2,
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
