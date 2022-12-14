/** @jsxImportSource @emotion/react */

import { techBadgeStyle } from './TechStackBadge.styles';

interface Props {
  techStack: string;
}

export const TechStackBadge = ({ techStack }: Props) => {
  return (
    <div css={techBadgeStyle}>
      <span>{techStack}</span>
    </div>
  );
};
