import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const profileBoxWrapperStyle = css({
  backgroundColor: COLORS.WHITE,
  border: `${COMMON_SIZE.LINE_WIDTH}px solid ${COLORS.BOX_BORDER}`,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  padding: `${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px ${COMMON_SIZE.PROFILE_BOX_PADDING_HORIZONTAL}px`,
  gridRow: '5 / 7',
  gridColumn: '1',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  [getMediaQuery(MEDIA_QUERY.LG)]: {
    gridRow: '2 / 4',
    gridColumn: '2',
  },
});

export const descriptionListStyle = css({
  flex: 1,
  display: 'grid',
  gridTemplateRows: 'minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr)',
  gap: 5,
  overflow: 'hidden',

  '> h4': {
    display: 'flex',
    alignItems: 'center',
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 600,
    color: COLORS.TEXT_1,
  },

  '> span': {
    display: 'inline-block',
    overflowX: 'hidden',
    overflowY: 'scroll',
    color: COLORS.TEXT_1,
    lineHeight: `${COMMON_SIZE.EDITOR_BOX_INPUT_HEIGHT}px`,
  },
});

export const descriptionTagWrapperStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  overflow: 'hidden',

  ' span': {
    display: 'inline-block',
    padding: 5,
    paddingBottom: 0,
    width: '45%',
    height: 'fit-content',
    fontSize: FONT_SIZE.MEDIUM,
    borderRadius: COMMON_SIZE.BORDER_RADIUS,
    border: `2px solid ${COLORS.PRIMARY_1}`,
    overflowX: 'scroll',
    overflowY: 'hidden',
  },
});
