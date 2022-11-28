/** @jsxImportSource @emotion/react */

import { Button, MiniNavBar } from 'common';
import { ProfileType } from 'types/profile';
import { BottomProfileBox } from './BottomProfileBox';
import { CodeBox } from './CodeBox';
import { TopProfileBox } from './TopProfileBox';

import {
  nicknameStyle,
  editButtonStyle,
  detailProfileWrapperStyle,
  nicknameSectionStyle,
  interestStyle,
} from './styles';

import { EditIcon } from 'assets/svgs';
import { INTEREST_COLOR_BASE, INTEREST_COLOR_BORDER, INTEREST_KOR } from './constants';

interface Props {
  profileData: ProfileType;
  onClickEditButton?: () => void;
  isMine?: boolean;
}

export const ViewModeContainer = ({ profileData, onClickEditButton, isMine }: Props) => {
  const { interest } = profileData;

  return (
    <>
      <MiniNavBar>
        <>
          <div css={nicknameSectionStyle}>
            <h2 css={nicknameStyle}>{profileData.nickname}</h2>
            <div css={interestStyle(INTEREST_COLOR_BASE[interest], INTEREST_COLOR_BORDER[interest])}>
              <span>{INTEREST_KOR[interest]}</span>
            </div>
          </div>
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
