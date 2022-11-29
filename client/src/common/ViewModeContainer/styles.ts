import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const detailProfileWrapperStyle = css({
  display: 'grid',
  marginBottom: 20,
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
  gap: 30,
  height: '69vh',
  paddingLeft: 30,
  paddingRight: 30,
});

export const nicknameStyle = css({
  lineHeight: '32px',
  color: COLORS.TEXT_1,
  fontWeight: 700,
  fontSize: FONT_SIZE.LARGE,
});

export const editButtonStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 32,

  ' svg': {
    width: 22,
    height: 22,
    marginRight: 10,
    fill: COLORS.WHITE,
  },
});
