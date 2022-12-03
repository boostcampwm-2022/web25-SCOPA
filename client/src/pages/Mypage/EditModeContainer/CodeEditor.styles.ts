import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const codeEditorWrapperStyle = (codeBoxThemeIndex: number) =>
  css({
    gridRow: '1 / 4',
    gridColumn: '1',
    border: `1px solid ${COLORS.BOX_BORDER}`,
    overflow: 'hidden',
    borderRadius: COMMON_SIZE.BORDER_RADIUS,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: codeBoxThemeIndex < 3 ? '#FFFFFE' : '#1E1E1E',
  });

export const codeEditorStyle = css({
  flex: 1,
  padding: '20px 10px',
  marginBottom: 10,
});

export const languageSelectorWrapperStyle = css({
  padding: 10,
  height: 36,
});

export const languageSelectorStyle = (codeBoxThemeIndex: number) =>
  css({
    height: 16,
    background: 'none',
    border: 'none',
    color: codeBoxThemeIndex < 3 ? COLORS.DARK : COLORS.LIGHT,
  });
