import { css, keyframes } from '@emotion/react';
import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

const iconAnimation = keyframes`
from {
	transform: rotateY(0deg);
} to {
	transform: rotateY(360deg);
}
`;

export const loadingFallbackStyle = css({
  width: '100%',
  height: 'calc(100vh - 125px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  ' svg': {
    width: '20%',
    height: '20%',
    animation: `${iconAnimation} 2s ease-in-out infinite`,
  },
});

export const loadingTextStyle = css({
  marginTop: 20,
  fontWeight: 600,
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.LARGE,
});
