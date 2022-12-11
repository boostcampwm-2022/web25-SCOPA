import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { MEDIA_QUERY } from 'styles/mediaQuery';
import { COMMON_SIZE } from 'styles/sizes';

export const messagePageWrapperStyle = css({
  marginBottom: 20,
  height: '69vh',
  paddingLeft: 30,
  paddingRight: 30,
  display: 'grid',
  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  gap: 30,

  [MEDIA_QUERY.LG]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
});

export const messagePageSectionStyle = css({
  width: '100%',
  height: '100%',
  backgroundColor: COLORS.WHITE,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  border: `1px solid ${COLORS.BOX_BORDER}`,
  padding: `${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px ${COMMON_SIZE.PROFILE_BOX_PADDING_HORIZONTAL}px`,
  gridColumn: '1 / 2',
  gridRow: '1 / 2',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  [MEDIA_QUERY.LG]: {
    gridColumn: 'initial',
    gridRow: 'initial',
  },
});
