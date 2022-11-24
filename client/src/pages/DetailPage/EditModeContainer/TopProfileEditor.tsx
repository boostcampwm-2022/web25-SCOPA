/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction } from 'react';

import { InterestSelector } from './InterestSelector';
import { TechStackSelector } from './TechStackSelector';
import { fieldStyle, profileBoxWrapperStyle } from './TopProfileEditor.styles';

interface Props {
  interest: string;
  setInterest: Dispatch<SetStateAction<string>>;
  skills: string[];
  setSkills: Dispatch<SetStateAction<string[]>>;
}

export const TopProfileEditor = ({ interest, setInterest, skills, setSkills }: Props) => {
  // const { newProfileData } = useSetEditor(userId, profileData);
  return (
    <div css={profileBoxWrapperStyle}>
      <div css={fieldStyle}>
        <h3>저는 이런 분야에 자신있어요</h3>
        <InterestSelector interest={interest} setInterest={setInterest} />
        <h3>저는 이런 기술을 사용할 수 있어요</h3>
        <TechStackSelector skills={skills} setSkills={setSkills} />
      </div>
    </div>
  );
};
