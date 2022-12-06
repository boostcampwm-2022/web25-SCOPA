import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

export const settingsBackgroundStyle = css({
  display: 'flex',
  height: '69vh',
  paddingLeft: 30,
  paddingRight: 30,
});

export const settingsWrapperStyle = css({
  width: '100%',
  height: '100%',
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  border: `${COMMON_SIZE.LINE_WIDTH}px solid ${COLORS.BOX_BORDER}`,
  backgroundColor: COLORS.WHITE,
  overflow: 'scroll',
});

export const settingsListStyle = css({
  padding: 20,
  borderBottom: `${COMMON_SIZE.LINE_WIDTH}px solid ${COLORS.BOX_BORDER}`,

  ' h3': {
    fontWeight: 600,
    fontSize: FONT_SIZE.LARGE,
    color: COLORS.TEXT_1,
    marginBottom: 20,
  },

  ':last-of-type': {
    border: 'none',
  },
});

export const subtitleWrapperStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
});

export const tooltipIconStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: 20,
  height: 20,
  borderRadius: 10,
  marginLeft: 10,
  border: `1px solid ${COLORS.BOX_BORDER}`,

  ' svg': {
    width: 15,
    height: 15,
    fill: COLORS.BOX_BORDER,
  },
});
