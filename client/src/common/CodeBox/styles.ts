import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const codeBoxWrapperStyle = (backgroundColor: string) =>
  css({
    height: '100%',
    backgroundColor,
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${COLORS.BOX_BORDER}`,
    borderRadius: COMMON_SIZE.BORDER_RADIUS,
    overflow: 'hidden',
  });

export const codeBoxStyle = (fontSize: number) => ({
  fontSize,
  height: '100%',
  padding: `${COMMON_SIZE.CODE_BOX_PADDING}px 10px`,
  flex: 1,
  marginBottom: 10,
});

export const lineNumberStyle = {
  width: '3rem',
  minWidth: '3rem',
  opacity: 0.7,
};

export const languageStyle = (textColor: string) =>
  css({
    padding: 10,
    color: textColor,
    fontStyle: 'italic',
    textAlign: 'end',
  });
