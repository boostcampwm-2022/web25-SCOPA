/** @jsxImportSource @emotion/react */

import { SearchIcon } from 'assets/svgs';
import { loadingFallbackStyle, loadingTextStyle } from './styles';

export const LoadingFallback = () => {
  return (
    <div css={loadingFallbackStyle}>
      <SearchIcon />
      <span css={loadingTextStyle}>로딩중!!!</span>
    </div>
  );
};
