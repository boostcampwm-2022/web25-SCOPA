import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const codeBoxWrapperStyle = css({
  backgroundColor: COLORS.TEXT_1,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  padding: COMMON_SIZE.CODE_BOX_PADDING,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  height: '100%',
});

export const codeBoxInnerStyle = css({
  width: '100%',
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '25px 1fr',
  gap: 8,
  overflow: 'hidden',
});

export const codeNumberStyle = css({
  display: 'flex',
  flexDirection: 'column',
  color: COLORS.TEXT_2,
});

export const codeBoxStyle = css({
  color: COLORS.WHITE,
});

export const languageStyle = css({
  color: COLORS.WHITE,
  opacity: 0.5,
  fontStyle: 'italic',
});

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

export const profileBoxStyle = css({
  width: 'calc((100% / 3) - 40px)',
  maxWidth: 600,
  minWidth: 350,
  maxHeight: 720,
  display: 'grid',
  gridTemplateRows: '10fr 1fr',
  flexGrow: 1,
  height: '95%',
  padding: 20,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.WHITE,
  border: `${COMMON_SIZE.LINE_WIDTH}px solid ${COLORS.BOX_BORDER}`,
  gap: 20,
  textAlign: 'start',
});

export const textWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

export const topTextStyle = css({
  marginBottom: 5,

  ' span': {
    color: COLORS.TEXT_1,
    fontWeight: '600',
  },

  ' span:first-of-type': {
    marginRight: 10,
  },
});

export const bottomTextStyle = css({
  color: COLORS.TEXT_2,
  opacity: 0.6,
  fontWeight: '600',
});

export const profileBoxBottomStyle = css({
  color: COLORS.TEXT_1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  fontWeight: 'bold',
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

export const favoriteButtonStyle = css({
  borderRadius: '50%',
  width: 40,
  height: 40,
  backgroundColor: 'white',
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
});

export const favoriteIconStyle = css({
  width: 30,
  height: 30,
  fill: COLORS.PRIMARY_2,
});

export const paginationStyle = css({
  fontSize: FONT_SIZE.MEDIUM,
  color: COLORS.TEXT_1,
  '& .pagination': {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  // '& ul': {
  //   listStyle: 'none',
  //   padding: 0,
  // },
  '& ul.pagination li': {
    width: 30,
    height: 30,
    border: '1px solid #e2e2e2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& ul.pagination li:first-of-type, ul.pagination li:last-child': {
    borderRadius: '5px 0 0 5px',
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
