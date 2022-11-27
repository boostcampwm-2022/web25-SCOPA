import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const codeBoxWrapperStyle = css({
  backgroundColor: COLORS.TEXT_1,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  padding: COMMON_SIZE.CODE_BOX_PADDING,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

export const codeBoxInnerStyle = css({
  width: '100%',
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '25px 1fr',
  gap: 8,
  overflow: 'hidden',
});

export const codeNumberStyle = css({
  display: 'flex',
  flexDirection: 'column',
  color: COLORS.TEXT_2,
});

export const codeBoxStyle = css({
  color: COLORS.WHITE,
});

export const languageStyle = css({
  color: COLORS.WHITE,
  opacity: 0.5,
  fontStyle: 'italic',
});

export const profileBoxStyle = css({
  width: 'calc((100% / 3) - 40px)',
  maxWidth: 590,
  minWidth: 350,
  maxHeight: 666.891,
  display: 'grid',
  gridTemplateRows: '1fr 10fr 1fr',
  flexGrow: 1,
  height: '95%',
  padding: 20,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.SECONDARY_1,
  gap: 10,
});

export const profileBoxTopStyle = css({
  color: COLORS.TEXT_1,
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});

export const profileBoxBottomStyle = css({
  color: COLORS.TEXT_1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  fontWeight: 'bold',
});

export const profileListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyItems: 'center',
  gap: 10,
  height: `calc(100% - 50px)`,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    backgroundColor: COLORS.SCROLL_BG_COLOR,
    width: COMMON_SIZE.SCROLLBAR_WIDTH,
  },
  '&::-webkit-scrollbar-thumb': {
    background: COLORS.SCROLLBAR_COLOR,
  },
});

export const emptyProfileBoxStyle = css({
  width: 'calc((100% / 3) - 40px)',
  maxWidth: 590,
  minWidth: 350,
  maxHeight: 666.891,
  flexGrow: 1,
  height: '95%',
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: 'none',
});

export const favoriteButtonStyle = css({
  borderRadius: '50%',
  width: 40,
  height: 40,
  backgroundColor: 'white',
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
});

export const favoriteIconStyle = css({
  width: 30,
  height: 30,
  fill: COLORS.PRIMARY_2,
});
