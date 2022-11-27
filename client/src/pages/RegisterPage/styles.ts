import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE, LOGIN_SIZE } from 'styles/sizes';

export const registerPageHeaderStyle = css({
  fontSize: FONT_SIZE.LARGE,
  color: COLORS.TEXT_1,
  textAlign: 'center',
  marginBottom: 10,
});

export const registerPageSubHeaderStyle = css({
  fontSize: FONT_SIZE.MEDIUM,
  color: COLORS.TEXT_1,
  textAlign: 'center',
  marginBottom: 20,
});

export const dropdownStyle = css({
  width: '60%',
  marginBottom: LOGIN_SIZE.INPUT_MARGIN_BOTTOM,
});

export const registerPageButtonStyle = (isAllSet: boolean) =>
  css({
    backgroundColor: COLORS.PRIMARY_1,
    fontSize: FONT_SIZE.LARGE,
    fontWeight: '600',
    padding: `10px 70px`,
    borderRadius: COMMON_SIZE.BORDER_RADIUS,
    opacity: isAllSet ? 1 : 0.5,
    transition: `0.1s linear`,

    ' span': {
      color: COLORS.WHITE,
    },

    ':hover': {
      opacity: isAllSet ? 0.8 : 0.5,
      cursor: isAllSet ? 'pointer' : 'initial',
    },
  });
