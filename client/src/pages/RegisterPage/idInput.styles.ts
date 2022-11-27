import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';
import { RESULT } from 'utils/constants';

export const idInputWrapperStyle = (isValid: number) =>
  css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: isValid !== RESULT.NULL ? 10 : 32,
  });

export const idInputStyle = css({
  width: '30%',
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.MEDIUM,
  padding: `4px 9px`, // 5px 10px 에서 테두리 1씩
  border: `1px solid ${COLORS.PRIMARY_3}`,
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  '::placeholder': {
    color: COLORS.TEXT_1,
    opacity: 0.5,
  },
});

export const idButtonStyle = css({
  backgroundColor: COLORS.PRIMARY_1,
  color: COLORS.SECONDARY_2,
  fontSize: FONT_SIZE.MEDIUM,
  padding: `5px 10px`,
  transition: `0.2s linear`,

  ':hover': {
    cursor: 'pointer',
    backgroundColor: COLORS.PRIMARY_2,
  },
});

export const idValidationStyle = (isValid: number) =>
  css({
    color: isValid === RESULT.SUCCESS ? 'green' : 'red',
    fontSize: FONT_SIZE.SMALL,
    marginBottom: 10,
  });
