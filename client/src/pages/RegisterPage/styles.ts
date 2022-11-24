import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';
import { RESULT } from 'utils/constants';

export const registerPageInnerStyle = css({
  display: 'grid',
  grid: 'repeat(5, 1fr)',
  justifyContent: 'center',
  alignItems: 'start',
  height: 400,
  width: COMMON_SIZE.LOGIN_BOX_WIDTH,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.SECONDARY_1,
});

export const registerPageHeaderStyle = css({
  fontSize: FONT_SIZE.LARGE,
  color: COLORS.TEXT_1,
  textAlign: 'center',
  lineHeight: 1.5,
});

export const registerPageInputWrapperStyle = css({
  height: 40,
  width: 400,
  display: 'flex',
  marginBottom: 5,
});

export const registerPageInputStyle = css({
  backgroundColor: COLORS.SECONDARY_2,
  border: 'none',
  width: 350,
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.LARGE,
  padding: 5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '::placeholder': {
    color: COLORS.TEXT_1,
  },
});

export const registerPageIdButtonStyle = css({
  backgroundColor: COLORS.PRIMARY_2,
  color: COLORS.SECONDARY_2,
  fontSize: FONT_SIZE.LARGE,
  width: 100,
});

export const registerInputArrowButtonStyle = css({
  backgroundColor: COLORS.PRIMARY_2,
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
});

export const registerPageButtonStyle = (isAllSet: boolean) =>
  css({
    backgroundColor: COLORS.PRIMARY_2,
    fontSize: FONT_SIZE.LARGE,
    fontWeight: 'bold',
    width: 400,
    height: 70,
    borderRadius: COMMON_SIZE.BORDER_RADIUS,
    opacity: isAllSet ? 1 : 0.5,
  });

export const idValidationStyle = (isAllValid: string) =>
  css({
    color: isAllValid === RESULT.SUCCESS ? 'green' : 'red',
    fontSize: FONT_SIZE.SMALL,
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
  '& ul.pagination li:first-child, ul.pagination li:last-child': {
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
