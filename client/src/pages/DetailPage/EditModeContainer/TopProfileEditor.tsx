/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction } from 'react';

import { InterestInput, TechStackInput } from 'common';

import { interestsStyle, profileBoxWrapperStyle, subtitleStyle } from './TopProfileEditor.styles';

interface Props {
  interest: string;
  setInterest: Dispatch<SetStateAction<string>>;
  techStack: string[];
  setTechStack: Dispatch<SetStateAction<string[]>>;
}

export const TopProfileEditor = ({ interest, setInterest, techStack, setTechStack }: Props) => {
  return (
    <section css={profileBoxWrapperStyle}>
      <h3 css={subtitleStyle}>저는 이런 분야에 관심이 있어요</h3>
      <InterestInput interest={interest} setInterest={setInterest} css={interestsStyle} />
      <TechStackInput techStack={techStack} setTechStack={setTechStack} />
    </section>
  );
};
