/** @jsxImportSource @emotion/react */

import { MiniNavBar } from 'common';
import { ProfileType } from 'types/profile';
import { BottomProfileEditor } from './BottomProfileEditor';
import { CodeEditor } from './CodeEditor';
import { TopProfileEditor } from './TopProfileEditor';
import { useSetProfileEditor } from './useSetProfileEditor';
import { NavBarInner } from './NavBarInner';

import { detailProfileWrapperStyle } from './styles';

interface Props {
  userId: string;
  profileData: ProfileType;
  onClickCancelButton: () => void;
}

export const EditModeContainer = ({ userId, profileData, onClickCancelButton }: Props) => {
  const {
    workTypeRef,
    workTimeRef,
    requirementRef1,
    requirementRef2,
    username,
    setUsername,
    code,
    setCode,
    interest,
    setInterest,
    techStack,
    setTechStack,
    language,
    setLanguage,
    handleClickSaveProfile,
  } = useSetProfileEditor(userId, profileData);

  return (
    <>
      <MiniNavBar>
        <NavBarInner
          onClickCancelButton={onClickCancelButton}
          onClickSaveProfile={handleClickSaveProfile}
          username={username}
          setUsername={setUsername}
        />
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        <CodeEditor language={language} setLanguage={setLanguage} code={code} setCode={setCode} />
        <TopProfileEditor
          interest={interest}
          setInterest={setInterest}
          techStack={techStack}
          setTechStack={setTechStack}
        />
        <BottomProfileEditor
          workTimeRef={workTimeRef}
          workTypeRef={workTypeRef}
          requirementRef1={requirementRef1}
          requirementRef2={requirementRef2}
          profileData={profileData}
        />
      </div>
    </>
  );
};
