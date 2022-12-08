import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const profileBoxStyle = css({
  position: 'relative',
  width: 'calc((100% / 3) - 40px)',
  maxWidth: 600,
  minWidth: 350,
  maxHeight: 720,
  display: 'grid',
  gridTemplateRows: '10fr 1fr',
  flexGrow: 1,
  height: '95%',
  padding: 20,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.WHITE,
  border: `${COMMON_SIZE.LINE_WIDTH}px solid ${COLORS.BOX_BORDER}`,
  gap: 20,
  textAlign: 'start',
});

export const profileBoxBottomStyle = css({
  color: COLORS.TEXT_1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  fontWeight: 'bold',
});

export const textWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

export const topTextStyle = css({
  marginBottom: 5,

  ' span': {
    color: COLORS.TEXT_1,
    fontWeight: '600',
  },

  ' span:first-of-type': {
    marginRight: 10,
  },
});

export const bottomTextStyle = css({
  color: COLORS.TEXT_2,
  opacity: 0.6,
  fontWeight: '600',
});

export const favoriteButtonStyle = css({
  borderRadius: '50%',
  width: 40,
  height: 40,
  backgroundColor: 'white',
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',

  ' svg': {
    width: 30,
    height: 30,
    fill: COLORS.PRIMARY_2,
  },
});
