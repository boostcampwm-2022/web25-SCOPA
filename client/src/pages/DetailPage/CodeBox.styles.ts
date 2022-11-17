import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const codeBoxWrapperStyle = css({
  backgroundColor: COLORS.TEXT_1,
  gridRow: '1 / 4',
  gridColumn: '1',
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
  overflow: 'scroll',
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
