import { css } from '@emotion/react';
import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const selectedItemsStyle = css({
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.MEDIUM,
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'center',
});

export const selectedItemStyle = css({
  display: 'flex',
  alignItems: 'center',
});
