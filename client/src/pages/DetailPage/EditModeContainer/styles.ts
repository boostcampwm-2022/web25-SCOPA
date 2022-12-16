import { css } from '@emotion/react';

import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';

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
