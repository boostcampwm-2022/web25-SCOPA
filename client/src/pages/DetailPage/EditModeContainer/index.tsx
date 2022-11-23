import { useState } from 'react';
import { ProfileType } from 'types/profile';
import { BottomProfileEditor } from './BottomProfileEditor';
import { CodeEditor } from './CodeEditor';
import { TopProfileEditor } from './TopProfileEditor';
import { useSetEditor } from './useSetEditor';

interface Props {
  userId: string;
  profileData: ProfileType;
}

export const EditModeContainer = ({ userId, profileData }: Props) => {
  const {
    newProfileData,
    handleChangeNickname,
    // handleChangeCode,
    handleChangeLanguage,
    setInterest,
    setSkills,
    handleChangeRequirements,
    handleChangeWorkTime,
    handleChangeWorkType,
    handleChangeEmail,
    handleClickSaveProfile,
    handleClickResetProfile,
  } = useSetEditor(userId, profileData);

  return (
    <>
      <CodeEditor />
      <TopProfileEditor interest={newProfileData.interest} techStack={newProfileData.skills} />
      <BottomProfileEditor
        workTime={newProfileData.worktime}
        workType={newProfileData.worktype}
        email={newProfileData.email}
        requirements={newProfileData.requirements}
        handleChangeEmail={handleChangeEmail}
        handleChangeWorkTime={handleChangeWorkTime}
        handleChangeWorkType={handleChangeWorkType}
        handleChangeRequirements={handleChangeRequirements}
      />
    </>
  );
};
