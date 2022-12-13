/** @jsxImportSource @emotion/react */

import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { CodeBox } from 'common';
import { fetchSendLikeToServer } from 'services';
import { InterestTag } from './InterestTag';
import { API } from 'utils/constants';
import { SingleProfileType } from 'types/profile';
import { currentUserState } from 'store/currentUserState';

import {
  favoriteButtonStyle,
  profileBoxBottomStyle,
  profileBoxStyle,
  textWrapperStyle,
  bottomTextStyle,
  rowTextWrapperStyle,
} from './Profile.styles';

import { HeartEmptyIcon, HeartFilledIcon } from 'assets/svgs';

const Profile = ({ singleData }: { singleData: SingleProfileType }) => {
  const { id, language, code, techStack, requirements, liked, interest } = singleData;
  if (!requirements[0] || requirements[0].length < 1) requirements[0] = '동료가 되고 싶어요!';
  if (!requirements[1] || requirements[1].length < 1) requirements[1] = '함께해요!';
  const { id: currentUserId } = useRecoilValue(currentUserState);
  const [like, setLike] = useState<boolean>(liked);
  const likeButtonRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  const handleProfileClick = useCallback(
    (e: React.BaseSyntheticEvent | MouseEvent) => {
      if (likeButtonRef.current?.contains(e.target)) {
        fetchSendLikeToServer(id, like ? 'delete' : 'post').then(() => {
          setLike((prevState) => !prevState);
        });
        return;
      }
      nav(API.DETAIL + id, { state: { isLiked: like } });
    },
    [likeButtonRef, like]
  );

  return (
    <button type='button' css={profileBoxStyle} onClick={handleProfileClick}>
      <InterestTag interest={interest} />
      <CodeBox code={code} language={language} />
      <div css={profileBoxBottomStyle}>
        <div css={textWrapperStyle}>
          <div css={rowTextWrapperStyle}>
            {requirements.map((value, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={`requirements-${id}-${index}`}># {value}</span>
            ))}
          </div>
          <span css={bottomTextStyle}>
            {techStack.length > 0 ? techStack.map((skill: string) => `${skill} `) : '기술스택 없음'}
          </span>
        </div>
        {currentUserId && (
          <div css={favoriteButtonStyle} ref={likeButtonRef}>
            {like ? <HeartFilledIcon /> : <HeartEmptyIcon />}
          </div>
        )}
      </div>
    </button>
  );
};

export default Profile;
