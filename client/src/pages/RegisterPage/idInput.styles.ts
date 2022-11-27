import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE, LOGIN_SIZE } from 'styles/sizes';

import { RESULT } from 'utils/constants';

export const idInputWrapperStyle = (isValid: number) =>
  css({
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom:
      isValid !== RESULT.NULL ? (LOGIN_SIZE.INPUT_MARGIN_BOTTOM - FONT_SIZE.SMALL) / 2 : LOGIN_SIZE.INPUT_MARGIN_BOTTOM,
  });

export const idInputStyle = css({
  width: '60%',
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.MEDIUM,
  padding: `${LOGIN_SIZE.INPUT_PADDING_VERTICAL - 0.5 / 2}px ${LOGIN_SIZE.INPUT_PADDING_HORIZONTAL - 0.5}px`, // 5px 10px 에서 테두리 1씩
  border: `1px solid ${COLORS.PRIMARY_1}`,
  borderRight: 'none',
  borderTopLeftRadius: LOGIN_SIZE.INPUT_BORDER_RADIUS,
  borderBottomLeftRadius: LOGIN_SIZE.INPUT_BORDER_RADIUS,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  '::placeholder': {
    color: COLORS.TEXT_1,
    opacity: 0.5,
  },
});

export const idButtonStyle = css({
  flex: 1,
  backgroundColor: COLORS.PRIMARY_1,
  color: COLORS.SECONDARY_2,
  fontSize: FONT_SIZE.MEDIUM,
  borderTopRightRadius: LOGIN_SIZE.INPUT_BORDER_RADIUS,
  borderBottomRightRadius: LOGIN_SIZE.INPUT_BORDER_RADIUS,
  padding: `${LOGIN_SIZE.INPUT_PADDING_VERTICAL}px ${LOGIN_SIZE.INPUT_PADDING_HORIZONTAL}px`,
  transition: `0.2s linear`,

  ':hover': {
    cursor: 'pointer',
    backgroundColor: COLORS.PRIMARY_2,
  },
});

export const idValidationStyle = (isValid: number) =>
  css({
    color: isValid === RESULT.SUCCESS ? COLORS.SUCCESS : COLORS.FAILURE,
    fontSize: FONT_SIZE.SMALL,
    marginBottom: (LOGIN_SIZE.INPUT_MARGIN_BOTTOM - FONT_SIZE.SMALL) / 2,
  });
