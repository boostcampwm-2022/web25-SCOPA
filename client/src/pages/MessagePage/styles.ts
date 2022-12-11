import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { MEDIA_QUERY } from 'styles/mediaQuery';
import { COMMON_SIZE } from 'styles/sizes';

export const messagePageWrapperStyle = css({
  marginBottom: 20,
  height: '69vh',
  paddingLeft: 30,
  paddingRight: 30,
});

export const messagePageInnerStyle = css({
  width: '100%',
  height: '100%',
  display: 'grid',
  backgroundColor: COLORS.WHITE,
  border: `1px solid ${COLORS.BOX_BORDER}`,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',

  [MEDIA_QUERY.PC]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
});

export const messagePageSectionStyle = css({
  width: '100%',
  height: '100%',
  backgroundColor: COLORS.WHITE,
  padding: `${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px ${COMMON_SIZE.PROFILE_BOX_PADDING_HORIZONTAL}px`,
  gridColumn: '1 / 2',
  gridRow: '1 / 2',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  [MEDIA_QUERY.PC]: {
    borderRight: `1px solid ${COLORS.BOX_BORDER}`,
    gridColumn: 'initial',
    gridRow: 'initial',
  },
});
