import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';
import { FONT_SIZE } from 'styles/sizes';

export const filterIconStyle = css({
  width: 30,
  height: 30,
  fill: COLORS.PRIMARY_2,
  display: 'none',

  [getMediaQuery(MEDIA_QUERY.MD)]: {
    display: 'block',
  },
});

export const likedCheckStyle = css({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 10,

  ' input': {
    margin: 0,
  },

  ' label': {
    marginLeft: 5,
    color: COLORS.TEXT_1,
    fontSize: FONT_SIZE.SMALL,
    overflowWrap: 'break-word',
  },

  [getMediaQuery(MEDIA_QUERY.LG)]: {
    marginBottom: 0,
    marginRight: 10,
  },
});

export const inputWrapperStyle = css({
  margin: `0 15px`,
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
});

export const dropdownWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,

  [getMediaQuery(MEDIA_QUERY.LG)]: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
});

export const searchButtonWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  [getMediaQuery(MEDIA_QUERY.LG)]: {
    flexDirection: 'row',
  },
});

export const interestBoxStyle = css({
  width: '30vw',
  marginBottom: 10,

  [getMediaQuery(MEDIA_QUERY.LG)]: {
    width: '20vw',
    marginBottom: 0,
    marginRight: 20,
  },
});

export const techStackBoxStyle = css({
  width: '40vw',
  marginRight: 20,

  [getMediaQuery(MEDIA_QUERY.LG)]: {
    width: '30vw',
  },
});

export const searchButtonStyle = css({
  height: 30,

  ' svg': {
    height: 20,
  },
});
