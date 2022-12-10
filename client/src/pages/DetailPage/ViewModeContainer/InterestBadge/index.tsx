/** @jsxImportSource @emotion/react */

import { INTEREST_KOR } from 'utils/constants';

import { interestStyle } from './styles';

interface Props {
  interest: string;
}

export const InterestBadge = ({ interest }: Props) => {
  return (
    <div css={interestStyle(interest)}>
      <span>{INTEREST_KOR[interest]}</span>
    </div>
  );
};
