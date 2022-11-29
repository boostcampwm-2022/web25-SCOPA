/** @jsxImportSource @emotion/react */

import { Button, MiniNavBar } from 'common';
import { ProfileType } from 'types/profile';
import { BottomProfileBox } from './BottomProfileBox';
import { CodeBox } from './CodeBox';
import { TopProfileBox } from './TopProfileBox';

import { nicknameStyle, editButtonStyle, detailProfileWrapperStyle } from './styles';

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
          <h2 css={nicknameStyle}>{profileData.nickname}</h2>
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
        <CodeBox code={profileData.code} language={profileData.language} />
        <TopProfileBox interest={profileData.interest} techStacks={profileData.skills} />
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
