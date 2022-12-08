/** @jsxImportSource @emotion/react */

import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CodeBox } from 'common';
import { sendLikeIdToServer } from './service';
import { singleProfileData } from './types';
import { API } from 'utils/constants';

import {
  favoriteButtonStyle,
  favoriteIconStyle,
  profileBoxBottomStyle,
  profileBoxStyle,
  topTextStyle,
  textWrapperStyle,
  bottomTextStyle,
} from './styles';

import { HeartEmptyIcon, HeartFilledIcon } from 'assets/svgs';

const Profile = ({ singleData }: { singleData: singleProfileData }) => {
  const { id, language, code, techStack, requirements, liked } = singleData;
  const [like, setLike] = useState<boolean>(liked);
  const likeButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLikeClick = useCallback(() => {
    setLike((prevState) => !prevState);
    // like 상태에 따라 서버로 다르게 보내주기
    if (like) sendLikeIdToServer(id, 'post');
    else sendLikeIdToServer(id, 'delete');
  }, [like]);

  const handleProfileClick = useCallback(
    (e: React.BaseSyntheticEvent | MouseEvent) => {
      if (likeButtonRef.current && likeButtonRef.current.contains(e.target)) {
        handleLikeClick();
        return;
      }
      navigate(API.DETAIL + id);
    },
    [likeButtonRef]
  );

  return (
    <button type='button' css={profileBoxStyle} onClick={handleProfileClick}>
      <CodeBox code={code} language={language} />
      <div css={profileBoxBottomStyle}>
        <div css={textWrapperStyle}>
          <div css={topTextStyle}>
            <span>#{requirements[0] ?? '동료가 되고 싶어요!'}</span>
            <span>#{requirements[1] ?? '함께해요!'}</span>
          </div>
          <span css={bottomTextStyle}>
            {techStack.length > 0 ? techStack.map((skill: string) => `${skill}\n`) : '기술스택 없음'}
          </span>
        </div>
        <div css={favoriteButtonStyle} ref={likeButtonRef}>
          {like ? <HeartFilledIcon css={favoriteIconStyle} /> : <HeartEmptyIcon css={favoriteIconStyle} />}
        </div>
      </div>
    </button>
  );
};

export default Profile;
