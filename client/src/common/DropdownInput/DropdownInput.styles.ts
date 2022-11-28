import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE, LOGIN_SIZE } from 'styles/sizes';

export const dropdownWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

export const dropdownContainerStyle = css({
  width: '100%',
  border: `1px solid ${COLORS.PRIMARY_1}`,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 0,
  paddingLeft: 10,
  borderRadius: LOGIN_SIZE.INPUT_BORDER_RADIUS,
  userSelect: 'none',

  ' span': {
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.TEXT_1,
    marginRight: 20,
  },
});

export const inputButtonArrowStyle = css({
  backgroundColor: COLORS.PRIMARY_1,
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  padding: `0 10px`,

  ' svg': {
    width: 20,
    height: 30,
  },

  ':hover': {
    cursor: 'pointer',
  },
});
