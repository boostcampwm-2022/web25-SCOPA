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
    padding: `10px 70px`,
    opacity: isAllSet ? 1 : 0.5,

    ' span': {
      fontSize: FONT_SIZE.LARGE,
      fontWeight: '600',
    },

    ':hover': {
      backgroundColor: isAllSet ? COLORS.PRIMARY_2 : COLORS.PRIMARY_1,
      cursor: isAllSet ? 'pointer' : 'initial',
    },
  });
