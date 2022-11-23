import { ProfileType } from 'types/profile';
import { BottomProfileBox } from './BottomProfileBox';
import { CodeBox } from './CodeBox';
import { TopProfileBox } from './TopProfileBox';

interface Props {
  profileData: ProfileType;
}

export const ViewModeContainer = ({ profileData }: Props) => {
  return (
    <>
      <CodeBox code={profileData.code} language={profileData.language} />
      <TopProfileBox interest={profileData.interest} techStack={profileData.skills} />
      <BottomProfileBox
        workTime={profileData.worktime}
        workType={profileData.worktype}
        email={profileData.email}
        requirements={profileData.requirements}
      />
    </>
  );
};
