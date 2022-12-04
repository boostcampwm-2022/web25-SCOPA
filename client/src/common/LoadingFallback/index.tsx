/** @jsxImportSource @emotion/react */

import { loadingFallbackStyle, loadingTextStyle } from './styles';

import { SearchIcon } from 'assets/svgs';

interface Props {
  text: string;
}

export const LoadingFallback = ({ text }: Props) => {
  return (
    <div css={loadingFallbackStyle}>
      <SearchIcon />
      <span css={loadingTextStyle}>{text}</span>
    </div>
  );
};
