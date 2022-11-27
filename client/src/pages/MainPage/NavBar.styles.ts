import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const filterIconStyle = css({
  width: 30,
  height: 30,
  fill: COLORS.PRIMARY_2,
});

export const likedCheckStyle = css({
  display: 'flex',
  alignItems: 'center',

  ' input': {
    margin: 0,
  },

  ' label': {
    marginLeft: 5,
    color: COLORS.TEXT_1,
    fontSize: FONT_SIZE.SMALL,
  },
});

export const inputWrapperStyle = css({
  margin: `0 15px`,
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
});

export const interestBoxStyle = css({
  width: '25%',
  marginRight: 20,
});

export const techStackBoxStyle = css({
  width: '40%',
  marginRight: 20,
});

export const searchButtonStyle = css({
  backgroundColor: COLORS.PRIMARY_1,
  padding: `5px 20px`,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  transition: `0.1s linear`,

  ' svg': {
    width: 20,
    height: 20,
  },

  ':hover': {
    backgroundColor: COLORS.PRIMARY_2,
  },
});
