/** @jsxImportSource @emotion/react */

import { Button, MiniNavBar } from 'common';
import { ProfileType } from 'types/profile';
import { BottomProfileEditor } from './BottomProfileEditor';
import { CodeEditor } from './CodeEditor';
import { TopProfileEditor } from './TopProfileEditor';
import { useSetProfileEditor } from './useSetProfileEditor';

import {
  nicknameEditorInputStyle,
  editButtonStyle,
  detailProfileWrapperStyle,
  cancelButtonStyle,
  validateButtonStyle,
  buttonWrapperStyle,
} from './styles';

import { SaveIcon, XIcon } from 'assets/svgs';

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
    code,
    setCode,
    interest,
    setInterest,
    skills,
    setSkills,
    language,
    setLanguage,
    handleClickSaveProfile,
  } = useSetProfileEditor(userId, profileData);

  return (
    <>
      <MiniNavBar>
        <>
          <div>
            <input type='text' css={nicknameEditorInputStyle} ref={nicknameRef} defaultValue={profileData.nickname} />
            <Button css={validateButtonStyle}>
              <span>중복확인</span>
            </Button>
          </div>
          <div css={buttonWrapperStyle}>
            <Button css={cancelButtonStyle} onClick={onClickCancelButton}>
              <XIcon />
            </Button>
            <Button css={editButtonStyle} onClick={handleClickSaveProfile}>
              <>
                <SaveIcon />
                <span>저장</span>
              </>
            </Button>
          </div>
        </>
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        <CodeEditor language={language} setLanguage={setLanguage} code={code} setCode={setCode} />
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
