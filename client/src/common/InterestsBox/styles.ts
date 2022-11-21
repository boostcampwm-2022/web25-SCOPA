import { css } from '@emotion/react';
import { COLORS } from '../../styles/colors';
import { COMMON_SIZE, FONT_SIZE } from '../../styles/sizes';

export const interestsBoxStyle = css({
  zIndex: 10,
  width: 200,
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  alignItems: 'center',
  backgroundColor: COLORS.SECONDARY_2,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  border: `5px solid ${COLORS.PRIMARY_1}`,
  '& button': {
    backgroundColor: COLORS.SECONDARY_2,
    fontSize: FONT_SIZE.MEDIUM,
    lineHeight: 3,
  },
  '& li': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    borderBottom: 'solid',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY_1,
    ':last-child': { border: 'none' },
  },
});
