import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

export const techBadgeStyle = css({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  borderRadius: 5,
  backgroundColor: COLORS.PRIMARY_1,
  padding: `0 10px`,

  ' span': {
    width: '100%',
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 600,
    overflow: 'hidden',
    userSelect: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
