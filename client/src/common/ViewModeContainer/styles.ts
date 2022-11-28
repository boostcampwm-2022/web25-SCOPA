import { css, keyframes } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const detailProfileWrapperStyle = css({
  display: 'grid',
  marginBottom: 20,
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
  gap: 30,
  maxHeight: '69vh',
  paddingLeft: 30,
  paddingRight: 30,
});

export const nicknameSectionStyle = css({
  display: 'flex',
  flexDirection: 'row',
});

export const nicknameStyle = css({
  lineHeight: '32px',
  color: COLORS.TEXT_1,
  fontWeight: 700,
  fontSize: FONT_SIZE.LARGE,
});

const animation = keyframes`
from {
  transform: skewX(30deg) translateX(-35px);
} to {
  transform: skewX(30deg) translateX(200px);
}`;

export const interestStyle = (bgColor: string, borderColor: string) =>
  css({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    width: 100,
    height: 32,
    borderRadius: 5,
    backgroundColor: bgColor,
    overflow: 'hidden',
    border: `1px solid ${borderColor}`,

    '::before': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 30,
      height: '100%',
      backgroundColor: COLORS.WHITE,
      opacity: 0.5,
      content: '""',
      transform: 'skewX(30deg) translateX(-35px)',
      animation: `${animation} 2s ease infinite`,
    },

    ' span': {
      color: COLORS.WHITE,
      fontWeight: 600,
    },
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
