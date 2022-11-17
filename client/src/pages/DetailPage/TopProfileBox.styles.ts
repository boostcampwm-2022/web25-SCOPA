import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE } from 'styles/sizes';

export const profileBoxWrapperStyle = css({
  backgroundColor: COLORS.PRIMARY_1,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  padding: COMMON_SIZE.PROFILE_BOX_PADDING,
});

export const profileBoxDescriptionListStyle = css({
  display: 'flex',
  flexDirection: 'column',

  '> dt': {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 600,
    color: COLORS.TEXT_1,
    marginBottom: COMMON_SIZE.PROFILE_BOX_DT_MARGIN_BOTTOM,
  },

  '> dt::before': {
    content: `'#'`,
    marginRight: 10,
  },

  '> dd': {
    color: COLORS.TEXT_1,
    marginBottom: COMMON_SIZE.PROFILE_BOX_DD_MARGIN_BOTTOM,
  },
});
