import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';
import { getMediaQuery } from '../../styles/mediaQuery';

export const profileBoxStyle = css({
  position: 'relative',
  height: 540,
  display: 'grid',
  gridTemplateRows: '10fr 1fr',
  flexGrow: 1,
  padding: 20,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.WHITE,
  border: `${COMMON_SIZE.LINE_WIDTH}px solid ${COLORS.BOX_BORDER}`,
  gap: 20,
  textAlign: 'start',

  [getMediaQuery(COMMON_SIZE.PROFILELIST_TRIPLE_WIDTH)]: {
    maxWidth: 'calc((100% / 3) - 15px)',
    minWidth: 'calc((100% / 3) - 15px)',
  },
  [getMediaQuery(COMMON_SIZE.PROFILELIST_DOUBLE_WIDTH, COMMON_SIZE.PROFILELIST_TRIPLE_WIDTH)]: {
    maxWidth: 'calc((100% / 2) - 5px)',
    minWidth: 350,
  },
  [getMediaQuery(0, COMMON_SIZE.PROFILELIST_SINGLE_WIDTH)]: {
    minWidth: 350,
  },
});

export const profileBoxBottomStyle = css({
  color: COLORS.TEXT_1,
  display: 'flex',
  height: 40,
  width: '100%',
  overflowX: 'hidden',
  overflowY: 'hidden',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
});

export const textWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'hidden',
});

export const rowTextWrapperStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflow: 'hidden',

  ' span': {
    display: 'inline-block',
    color: COLORS.TEXT_1,
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: '600',
    marginRight: 10,
  },
});

export const bottomTextStyle = css({
  color: COLORS.TEXT_2,
  width: '100%',
  overflowX: 'scroll',
  overflowY: 'hidden',
  opacity: 0.6,
  fontWeight: '600',
  marginTop: 5,
});

export const favoriteButtonStyle = css({
  width: 40,
  height: 40,
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',

  ' svg': {
    width: 30,
    height: 30,
    fill: COLORS.PRIMARY_2,
  },
});
