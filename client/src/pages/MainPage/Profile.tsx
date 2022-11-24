/** @jsxImportSource @emotion/react */

import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SummarizedCodeBox from './SummarizedCodeBox';
import { singleProfileData } from './types';
import { API } from 'utils/constants';

import { likeButtonStyle, likeIconStyle, profileBoxBottomStyle, profileBoxStyle, profileBoxTopStyle } from './styles';

import { HeartEmptyIcon, HeartFilledIcon } from 'assets/svgs';

const Profile = ({ singleData }: { singleData: singleProfileData }) => {
  const [id, language, code, skills, requirements, liked] = [
    singleData.id,
    singleData.language,
    singleData.code,
    singleData.skills,
    singleData.requirements,
    singleData.liked,
  ];
  const [like, setLike] = useState(liked);
  const likeButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const sendLikedIdToServer = useCallback((likedId: string, type: string) => {
    fetch(`${process.env.REACT_APP_FETCH_URL}${API.LIKE}`, {
      credentials: 'include',
      method: type,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: likedId }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) return;
        if (res.code === 400) alert('잠시 후 다시 시도해주세요.');
      })
      .catch(() => {
        alert('잠시 후 다시 시도해주세요.');
      });
  }, []);

  const handleLikeClick = useCallback(() => {
    setLike((prevState) => !prevState);
    // like 상태에 따라 서버로 다르게 보내주기
    if (like) sendLikedIdToServer(id, 'post');
    else sendLikedIdToServer(id, 'delete');
  }, [like]);

  const handleProfileClick = useCallback(
    (e: React.BaseSyntheticEvent | MouseEvent) => {
      if (likeButtonRef.current && likeButtonRef.current.contains(e.target)) {
        handleLikeClick();
        return;
      }
      navigate(`detail/${id}`);
      // navigate(`/detail/${id}`);
    },
    [likeButtonRef]
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <button type='button' css={profileBoxStyle} onClick={handleProfileClick}>
      <div css={profileBoxTopStyle}>
        <span>#{requirements.length > 0 ? requirements[0] : '동료가 되고 싶어요!'}</span>
        <span>#{requirements.length > 1 ? requirements[1] : '함께해요!'}</span>
      </div>
      <SummarizedCodeBox language={language} code={code} />
      <div css={profileBoxBottomStyle}>
        <span>{skills.slice(0, 3).map((skill: string) => `${skill}\n`)}</span>
        <div css={likeButtonStyle} ref={likeButtonRef}>
          {like ? <HeartFilledIcon css={likeIconStyle} /> : <HeartEmptyIcon css={likeIconStyle} />}
        </div>
      </div>
    </button>
  );
};

export default Profile;
