import { ProfileType } from 'types/profile';
import { CodeEditor } from './CodeEditor';
import { TopProfileEditor } from './TopProfileEditor';

interface Props {
  profileData: ProfileType;
}

export const EditModeContainer = ({ profileData }: Props) => {
  return (
    <>
      <CodeEditor />
      <TopProfileEditor interest={profileData.interest} techStack={profileData.skills} />
    </>
  );
};
