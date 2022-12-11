import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';
import { COMMON_SIZE } from 'styles/sizes';

export const detailProfileWrapperStyle = css({
  display: 'grid',
  gridTemplateRows: 'repeat(6, minmax(0, 1fr))',
  gap: 30,
  paddingLeft: 30,
  paddingRight: 30,

  [getMediaQuery(MEDIA_QUERY.LG)]: {
    height: '69vh',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
    paddingLeft: 60,
    paddingRight: 60,
  },
});

export const detailDummyNavBarStyle = css({
  height: 32,
  width: 10,
});

export const detailLoadingFallbackStyle = css({
  height: '69vh',
});

export const editButtonStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 32,

  ' svg': {
    width: 22,
    height: 22,
    marginRight: 10,
    fill: COLORS.WHITE,
  },
});

export const likeButtonWrapperStyle = css({
  height: 30,
});

export const likeButtonStyle = css({
  width: 30,
  height: 30,
  padding: 0,

  ' svg': {
    width: 30,
    height: 30,
    fill: COLORS.PRIMARY_2,
  },

  ':first-of-type': {
    marginRight: 20,
  },
});

export const codeSectionStyle = css({
  gridRow: '1 / 4',
  gridColumn: '1',
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  overflow: 'hidden',
});
