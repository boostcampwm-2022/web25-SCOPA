import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

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
  overflow: 'scroll',
  padding: `${COMMON_SIZE.CODE_BOX_PADDING}px 10px`,
  flex: 1,
  marginBottom: 10,
});

export const noCodeBoxStyle = css({
  height: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const cryIconStyle = (innerColor: string) =>
  css({
    width: '30%',
    marginBottom: 10,

    ' path': {
      stroke: innerColor,
    },
  });

export const cryTextStyle = (innerColor: string) =>
  css({
    fontSize: FONT_SIZE.LARGE,
    color: innerColor,
    fontWeight: 600,
  });

export const lineNumberStyle = {
  width: '3rem',
  minWidth: '3rem',
  opacity: 0.7,
};

export const languageStyle = (textColor: string) =>
  css({
    fontSize: FONT_SIZE.MEDIUM,
    padding: 10,
    color: textColor,
    fontStyle: 'italic',
    textAlign: 'end',
  });
