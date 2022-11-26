/** @jsxImportSource @emotion/react */

import { MiniNavBar } from 'common';
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
  return (
    <>
      <MiniNavBar>
        <>
          <span css={nicknameSpanStyle}>{profileData.nickname}</span>
          <button type='button' css={editButtonStyle} onClick={onClickEditButton}>
            <EditIcon />
          </button>
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
