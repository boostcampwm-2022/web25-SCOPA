import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const codeBoxWrapperStyle = css({
  backgroundColor: COLORS.TEXT_1,
  gridRow: '1 / 4',
  gridColumn: '1',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  overflow: 'hidden',
});

export const codeboxStyle = {
  background: 'none',
  padding: `${COMMON_SIZE.CODE_BOX_PADDING}px 10px`,
  flex: 1,
  marginBottom: 10,
};

export const languageStyle = css({
  padding: 10,
  color: COLORS.WHITE,
  opacity: 0.5,
  fontStyle: 'italic',
  textAlign: 'end',
});
