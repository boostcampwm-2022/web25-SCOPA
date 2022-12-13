import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';
import { FONT_SIZE } from 'styles/sizes';

export const profileListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyItems: 'center',
  gap: 10,
  flex: 1,
  padding: `10px 20px`,
  height: `calc(100% - 50px)`,

  [getMediaQuery(MEDIA_QUERY.SM)]: {
    padding: `15px 60px`,
  },
});

export const paginationStyle = css({
  fontSize: FONT_SIZE.MEDIUM,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: COLORS.TEXT_1,
  marginBottom: 10,

  ' .pagination': {
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
    border: `1px solid ${COLORS.BOX_BORDER}`,
    borderRadius: 5,
    overflow: 'hidden',
  },

  li: {
    width: 30,
    height: 30,
    borderLeft: `1px solid ${COLORS.BOX_BORDER}`,
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.1s linear',

    ':first-of-type': {
      border: 'none',
    },

    ':hover': {
      backgroundColor: COLORS.LIGHT,
      cursor: 'pointer',
    },

    ' a': {
      textDecoration: 'none',
      color: COLORS.PRIMARY_1,
    },

    '&.active': {
      backgroundColor: COLORS.PRIMARY_1,
    },

    '&.active a': {
      color: COLORS.WHITE,
    },
  },
});
