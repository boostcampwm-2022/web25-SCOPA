/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

interface Props {
  text: string;
}

export const NavSubtitle = ({ text }: Props) => {
  return <h2 css={subtitleStyle}>{text}</h2>;
};

const subtitleStyle = css({
  lineHeight: '32px',
  color: COLORS.TEXT_1,
  fontWeight: 700,
  fontSize: FONT_SIZE.LARGE,
});
