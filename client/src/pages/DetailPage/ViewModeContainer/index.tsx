/** @jsxImportSource @emotion/react */

import { useRecoilValue } from 'recoil';

import { Button, MiniNavBar } from 'common';
import { currentUserState } from 'store';
import { ProfileType } from 'types/profile';
import { BottomProfileBox } from './BottomProfileBox';
import { CodeBox } from './CodeBox';
import { TopProfileBox } from './TopProfileBox';

import { nicknameSpanStyle, editButtonStyle, detailProfileWrapperStyle } from '../styles';

import { EditIcon } from 'assets/svgs';

interface Props {
  profileData: ProfileType;
  onClickEditButton: () => void;
}

export const ViewModeContainer = ({ profileData, onClickEditButton }: Props) => {
  const { id: userID } = useRecoilValue(currentUserState);
  return (
    <>
      <MiniNavBar>
        <>
          <span css={nicknameSpanStyle}>{profileData.nickname}</span>
          {userID !== profileData.id && (
            <Button css={editButtonStyle} onClick={onClickEditButton}>
              <>
                <span>편집</span>
                <EditIcon />
              </>
            </Button>
          )}
        </>
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        <CodeBox code={profileData.code} language={profileData.language} />
        <TopProfileBox interest={profileData.interest} techStack={profileData.skills} />
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
