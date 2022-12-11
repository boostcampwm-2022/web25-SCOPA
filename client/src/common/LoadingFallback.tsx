/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { COLORS } from 'styles/colors';
import { FONT_SIZE } from 'styles/sizes';

interface Props {
  text: string;
}

export const LoadingFallback = ({ text }: Props) => {
  return (
    <div css={loadingFallbackStyle}>
      <img src='/earlybird.gif' alt='loading earlybird' width={100} height={100} />
      <span css={loadingTextStyle}>{text}</span>
    </div>
  );
};

const loadingFallbackStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  ' img': {
    width: 100,
    height: 100,
  },
});

const loadingTextStyle = css({
  marginTop: 20,
  fontWeight: 600,
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.LARGE,
});
