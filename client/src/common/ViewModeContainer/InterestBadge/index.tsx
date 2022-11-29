/** @jsxImportSource @emotion/react */

import { INTEREST_COLOR_BASE, INTEREST_COLOR_BORDER, INTEREST_KOR } from './constants';

import { interestStyle } from './styles';

interface Props {
  interest: string;
}

export const InterestBadge = ({ interest }: Props) => {
  return (
    <div css={interestStyle(INTEREST_COLOR_BASE[interest], INTEREST_COLOR_BORDER[interest])}>
      <span>{INTEREST_KOR[interest]}</span>
    </div>
  );
};
