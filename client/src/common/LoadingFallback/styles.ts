import { css, keyframes } from '@emotion/react';
import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

const iconAnimation = keyframes`
from {
	transform: rotateX(0deg);
} to {
	transform: rotateX(360deg);
}
`;

export const loadingFallbackStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  ' svg': {
    width: '30%',
    height: '30%',
    fill: COLORS.TEXT_1,
    animation: `${iconAnimation} 2s ease-in-out infinite`,
  },
});

export const loadingTextStyle = css({
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.LARGE,
});
