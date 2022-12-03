/** @jsxImportSource @emotion/react */

import { Button, MiniNavBar, CodeBox, NavSubtitle } from 'common';
import { ProfileType } from 'types/profile';
import { BottomProfileBox } from './BottomProfileBox';
import { TopProfileBox } from './TopProfileBox';

import { editButtonStyle, detailProfileWrapperStyle, codeSectionStyle } from './styles';

import { EditIcon } from 'assets/svgs';

interface Props {
  profileData: ProfileType;
  onClickEditButton?: () => void;
  isMine?: boolean;
}

export const ViewModeContainer = ({ profileData, onClickEditButton, isMine }: Props) => {
  return (
    <>
      <MiniNavBar>
        <>
          <NavSubtitle text={profileData.nickname} />
          {isMine && (
            <Button css={editButtonStyle} onClick={onClickEditButton}>
              <>
                <EditIcon />
                <span>편집</span>
              </>
            </Button>
          )}
        </>
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        <section css={codeSectionStyle}>
          <CodeBox code={profileData.code} language={profileData.language} />
        </section>
        <TopProfileBox interest={profileData.interest} techStacks={profileData.techStack} />
        <BottomProfileBox
          workTime={profileData.worktime}
          workType={profileData.worktype}
          email={profileData.email}
          requirements={profileData.requirements}
        />
      </div>
    </>
  );
};
