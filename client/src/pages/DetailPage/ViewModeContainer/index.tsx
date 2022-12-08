/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';

import { Button, MiniNavBar, CodeBox, NavSubtitle } from 'common';
import { fetchSendLikeToServer } from 'services';
import { ProfileType } from 'types/profile';
import { BottomProfileBox } from './BottomProfileBox';
import { TopProfileBox } from './TopProfileBox';

import { editButtonStyle, detailProfileWrapperStyle, codeSectionStyle, likeButtonStyle } from './styles';

import { EditIcon, HeartEmptyIcon, HeartFilledIcon } from 'assets/svgs';

interface Props {
  userId: string;
  profileData: ProfileType;
  onClickEditButton?: () => void;
  isMine?: boolean;
}

export const ViewModeContainer = ({ userId, profileData, onClickEditButton, isMine }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(!!profileData.liked);

  const handleClickLikeButton = useCallback(() => {
    fetchSendLikeToServer(userId, isLiked ? 'delete' : 'post').then(() => {
      setIsLiked((prevState) => !prevState);
    });
  }, [isLiked]);

  return (
    <>
      <MiniNavBar>
        <>
          <NavSubtitle text={profileData.username} />
          {isMine ? (
            <Button css={editButtonStyle} onClick={onClickEditButton}>
              <>
                <EditIcon />
                <span>편집</span>
              </>
            </Button>
          ) : (
            <button type='button' onClick={handleClickLikeButton} css={likeButtonStyle}>
              {isLiked ? <HeartFilledIcon /> : <HeartEmptyIcon />}
            </button>
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
