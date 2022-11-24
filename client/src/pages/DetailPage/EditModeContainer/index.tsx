/** @jsxImportSource @emotion/react */

import { MiniNavBar } from 'common';
import { ProfileType } from 'types/profile';
import { BottomProfileEditor } from './BottomProfileEditor';
import { CodeEditor } from './CodeEditor';
import { TopProfileEditor } from './TopProfileEditor';
import { useSetEditor } from './useSetEditor';

import { nicknameEditorInputStyle, editButtonStyle, detailProfileWrapperStyle } from '../styles';

import { SaveIcon } from 'assets/svgs';

interface Props {
  userId: string;
  profileData: ProfileType;
  onClickCancelButton: () => void;
}

export const EditModeContainer = ({ userId, profileData, onClickCancelButton }: Props) => {
  const {
    workTypeRef,
    workTimeRef,
    nicknameRef,
    emailRef,
    requirementRef1,
    requirementRef2,
    interest,
    setInterest,
    skills,
    setSkills,
    setLanguage,
    handleClickSaveProfile,
  } = useSetEditor(userId, profileData);

  return (
    <>
      <MiniNavBar>
        <>
          <input type='text' css={nicknameEditorInputStyle} ref={nicknameRef} defaultValue={profileData.nickname} />
          <button type='button' css={editButtonStyle} onClick={onClickCancelButton}>
            <SaveIcon />
          </button>
        </>
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        <CodeEditor />
        <TopProfileEditor interest={interest} setInterest={setInterest} skills={skills} setSkills={setSkills} />
        <BottomProfileEditor
          workTimeRef={workTimeRef}
          workTypeRef={workTypeRef}
          emailRef={emailRef}
          requirementRef1={requirementRef1}
          requirementRef2={requirementRef2}
          profileData={profileData}
        />
      </div>
    </>
  );
};
