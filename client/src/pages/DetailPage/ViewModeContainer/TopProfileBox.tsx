/** @jsxImportSource @emotion/react */

import { DescriptionListStyle, profileBoxWrapperStyle } from './TopProfileBox.styles';

interface Props {
  interest: string;
  techStack: string[];
}

export const TopProfileBox = ({ interest, techStack }: Props) => {
  return (
    <div css={profileBoxWrapperStyle}>
      <dl css={DescriptionListStyle}>
        <dt>저는 이런 분야에 자신있어요</dt>
        <dd>{interest}</dd>
        <dt>저는 이런 기술을 사용할 수 있어요</dt>
        <dd>{techStack.join(', ')}</dd>
      </dl>
    </div>
  );
};
