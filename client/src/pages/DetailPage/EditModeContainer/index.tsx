import { useState } from 'react';

import { ProfileType } from 'types/profile';
import { BottomProfileEditor } from './BottomProfileEditor';
import { CodeEditor } from './CodeEditor';
import { TopProfileEditor } from './TopProfileEditor';

interface Props {
  userId: string;
  profileData: ProfileType;
}

export const EditModeContainer = ({ userId, profileData }: Props) => {
  return (
    <>
      <CodeEditor />
      <TopProfileEditor userId={userId} profileData={profileData} />
      <BottomProfileEditor userId={userId} profileData={profileData} />
    </>
  );
};
