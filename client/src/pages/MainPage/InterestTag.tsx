/** @jsxImportSource @emotion/react */

import { LabelIcon } from 'assets/svgs';
import { interestTagInnerStyle, interestTagStyle } from './InterestTag.styles';

interface Props {
  interest: string;
}

export const InterestTag = ({ interest }: Props) => {
  const shorthandText = {
    Frontend: 'FE',
    Backend: 'BE',
    iOS: 'iOS',
    Android: 'And',
  }[interest];
  return (
    <div css={interestTagStyle}>
      <div css={interestTagInnerStyle(interest)}>
        <span>{shorthandText}</span>
        <LabelIcon />
      </div>
    </div>
  );
};
