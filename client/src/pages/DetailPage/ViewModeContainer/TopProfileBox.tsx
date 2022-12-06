/** @jsxImportSource @emotion/react */

import { InterestBadge } from './InterestBadge';
import { TechStackBadge } from './TechStackBadge';

import { subtitleStyle, profileBoxWrapperStyle, profileBoxInnerStyle } from './TopProfileBox.styles';

interface Props {
  interest: string;
  techStacks: string[];
}

export const TopProfileBox = ({ interest, techStacks }: Props) => {
  return (
    <section css={profileBoxWrapperStyle}>
      <h3 css={subtitleStyle}>저는 이런 분야에 관심이 있어요</h3>
      <div css={profileBoxInnerStyle}>
        <InterestBadge interest={interest} />
        {techStacks.map((techStack) => (
          <TechStackBadge key={`tech-stack-badge-${techStack}`} techStack={techStack} />
        ))}
      </div>
    </section>
  );
};
