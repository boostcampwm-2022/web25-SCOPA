/** @jsxImportSource @emotion/react */

import { loadingFallbackStyle, loadingTextStyle } from './styles';

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
