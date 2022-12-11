/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { COMMON_SIZE, FONT_SIZE } from 'styles/sizes';

interface Props {
  children: JSX.Element;
}

export const MessageTopBar = ({ children }: Props) => {
  return <div css={messageTopBarStyle}>{children}</div>;
};

export const messageTopBarStyle = css({
  padding: `10px 10px ${COMMON_SIZE.PROFILE_BOX_PADDING_VERTICAL}px`,
  fontSize: FONT_SIZE.LARGE,
  borderBottom: `2px solid ${COLORS.BOX_BORDER}`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  color: COLORS.TEXT_1,
  backgroundColor: COLORS.WHITE,
  zIndex: 2,
});
