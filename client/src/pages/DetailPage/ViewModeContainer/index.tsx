/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { currentUserState } from 'store';
import { Button, MiniNavBar, CodeBox, NavSubtitle } from 'common';
import { fetchSendLikeToServer } from 'services';
import { ProfileType } from 'types/profile';
import { BottomProfileBox } from './BottomProfileBox';
import { TopProfileBox } from './TopProfileBox';

import {
  editButtonStyle,
  detailProfileWrapperStyle,
  codeSectionStyle,
  likeButtonStyle,
  likeButtonWrapperStyle,
} from './styles';

import { EditIcon, HeartEmptyIcon, HeartFilledIcon, MessageIcon } from 'assets/svgs';
import { useNavigate } from 'react-router-dom';

interface Props {
  userId: string;
  profileData: ProfileType;
  onClickEditButton?: () => void;
}

export const ViewModeContainer = ({ userId, profileData, onClickEditButton }: Props) => {
  const { id: currentUserID } = useRecoilValue(currentUserState);
  const isMine = currentUserID === userId;
  const [isLiked, setIsLiked] = useState<boolean>(!!profileData.liked);
  const nav = useNavigate();

  const handleClickLikeButton = useCallback(() => {
    fetchSendLikeToServer(userId, isLiked ? 'delete' : 'post').then(() => {
      setIsLiked((prevState) => !prevState);
    });
  }, [isLiked]);

  const handleClickMessageButton = useCallback(() => {
    nav(`/message/${userId}`);
  }, []);

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
            currentUserID && (
            <div css={likeButtonWrapperStyle}>
              <button type='button' onClick={handleClickMessageButton} css={likeButtonStyle}>
                <MessageIcon />
              </button>
              <button type='button' onClick={handleClickLikeButton} css={likeButtonStyle}>
                {isLiked ? <HeartFilledIcon /> : <HeartEmptyIcon />}
              </button>
            </div>
            )
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
          requirements={profileData.requirements}
        />
      </div>
    </>
  );
};
