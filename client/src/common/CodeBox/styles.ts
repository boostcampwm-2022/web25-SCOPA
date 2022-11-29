import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const codeBoxWrapperStyle = css({
  height: '100%',
  backgroundColor: COLORS.TEXT_1,
  display: 'flex',
  flexDirection: 'column',
});

export const codeboxStyle = {
  height: '100%',
  background: 'none',
  padding: `${COMMON_SIZE.CODE_BOX_PADDING}px 10px`,
  flex: 1,
  marginBottom: 10,
};

export const lineNumberStyle = {
  width: '3rem',
  minWidth: '3rem',
  opacity: 0.7,
};

export const languageStyle = css({
  padding: 10,
  color: COLORS.WHITE,
  opacity: 0.5,
  fontStyle: 'italic',
  textAlign: 'end',
});
