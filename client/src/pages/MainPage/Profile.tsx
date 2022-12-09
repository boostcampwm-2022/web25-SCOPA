/** @jsxImportSource @emotion/react */

import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CodeBox } from 'common';
import { fetchSendLikeToServer } from 'services';
import { singleProfileData } from './types';
import { API } from 'utils/constants';

import {
  favoriteButtonStyle,
  profileBoxBottomStyle,
  profileBoxStyle,
  topTextStyle,
  textWrapperStyle,
  bottomTextStyle,
} from './Profile.styles';

import { HeartEmptyIcon, HeartFilledIcon } from 'assets/svgs';
import { InterestTag } from './InterestTag';

const Profile = ({ singleData }: { singleData: singleProfileData }) => {
  const { id, language, code, techStack, requirements, liked, interest } = singleData;
  const [like, setLike] = useState<boolean>(liked);
  const likeButtonRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  const handleProfileClick = useCallback(
    (e: React.BaseSyntheticEvent | MouseEvent) => {
      if (likeButtonRef.current && likeButtonRef.current.contains(e.target)) {
        fetchSendLikeToServer(id, like ? 'delete' : 'post').then(() => {
          setLike((prevState) => !prevState);
        });
        return;
      }
      nav(API.DETAIL + id);
    },
    [likeButtonRef, like]
  );

  return (
    <button type='button' css={profileBoxStyle} onClick={handleProfileClick}>
      <InterestTag interest={interest} />
      <CodeBox code={code} language={language} />
      <div css={profileBoxBottomStyle}>
        <div css={textWrapperStyle}>
          <div css={topTextStyle}>
            <span>#{requirements[0] && requirements[0].length > 0 ? requirements[0] : '동료가 되고 싶어요!'}</span>
            <span>#{requirements[1] && requirements[1].length > 0 ? requirements[1] : '함께해요!'}</span>
          </div>
          <span css={bottomTextStyle}>
            {techStack.length > 0 ? techStack.map((skill: string) => `${skill}\n`) : '기술스택 없음'}
          </span>
        </div>
        <div css={favoriteButtonStyle} ref={likeButtonRef}>
          {like ? <HeartFilledIcon /> : <HeartEmptyIcon />}
        </div>
      </div>
    </button>
  );
};

export default Profile;
