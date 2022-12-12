import { css } from '@emotion/react';

import { VALIDATION_RESULT } from 'utils/constants';

import { COLORS } from 'styles/colors';
import { FONT_SIZE, LOGIN_SIZE } from 'styles/sizes';
import { getMediaQuery, MEDIA_QUERY } from 'styles/mediaQuery';

export const usernameInputWrapperStyle = (validationType: number) =>
  css({
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom:
      validationType !== VALIDATION_RESULT.NULL
        ? (LOGIN_SIZE.INPUT_MARGIN_BOTTOM - FONT_SIZE.SMALL) / 2
        : LOGIN_SIZE.INPUT_MARGIN_BOTTOM,
  });

export const usernameInputStyle = css({
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.SMALL,
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

  [getMediaQuery(MEDIA_QUERY.SM)]: {
    fontSize: FONT_SIZE.MEDIUM,
  },
});

export const usernameButtonStyle = css({
  flex: 1,
  backgroundColor: COLORS.PRIMARY_1,
  color: COLORS.LIGHT,
  fontSize: FONT_SIZE.SMALL,
  borderTopRightRadius: LOGIN_SIZE.INPUT_BORDER_RADIUS,
  borderBottomRightRadius: LOGIN_SIZE.INPUT_BORDER_RADIUS,
  padding: `${LOGIN_SIZE.INPUT_PADDING_VERTICAL}px ${LOGIN_SIZE.INPUT_PADDING_HORIZONTAL}px`,
  transition: `0.2s linear`,
  whiteSpace: 'nowrap',

  ':hover': {
    cursor: 'pointer',
    backgroundColor: COLORS.PRIMARY_2,
  },

  [getMediaQuery(MEDIA_QUERY.SM)]: {
    fontSize: FONT_SIZE.MEDIUM,
  },
});

export const usernameValidationStyle = (validationType: number) =>
  css({
    color: validationType === VALIDATION_RESULT.SUCCESS ? COLORS.SUCCESS : COLORS.FAILURE,
    fontSize: FONT_SIZE.SMALL,
    marginBottom: (LOGIN_SIZE.INPUT_MARGIN_BOTTOM - FONT_SIZE.SMALL) / 2,
  });
