import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const profileListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyItems: 'center',
  gap: 10,
  flex: 1,
  padding: `15px 60px`,
  height: `calc(100% - 50px)`,
});

export const emptyProfileBoxStyle = css({
  width: 'calc((100% / 3) - 40px)',
  maxWidth: 600,
  minWidth: 350,
  maxHeight: 720,
  flexGrow: 1,
  height: '95%',
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: 'none',
});

export const paginationStyle = css({
  fontSize: FONT_SIZE.MEDIUM,
  color: COLORS.TEXT_1,
  marginBottom: 10,
  '& .pagination': {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  '& ul.pagination li': {
    width: 30,
    height: 30,
    border: `1px solid ${COLORS.BOX_BORDER}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& ul.pagination li:first-of-type': {
    borderRadius: '5px 0 0 5px',
  },
  '& ul.pagination li:last-child': {
    borderRadius: '0 5px 5px 0',
  },
  '& ul.pagination li a': {
    textDecoration: 'none',
    color: COLORS.PRIMARY_1,
  },
  '& ul.pagination li.active a': {
    color: 'white',
  },
  '& ul.pagination li.active': {
    backgroundColor: COLORS.PRIMARY_2,
  },
  '& ul.pagination li a:hover, ul.pagination li a.active': {
    color: COLORS.TEXT_1,
  },
});
