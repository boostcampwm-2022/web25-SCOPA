/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';

import SummarizedCodeBox from './SummarizedCodeBox';
import { singleProfileData } from './types';

import {
  favoriteButtonStyle,
  favoriteIconStyle,
  profileBoxBottomStyle,
  profileBoxStyle,
  profileBoxTopStyle,
} from './styles';

import { HeartEmptyIcon, HeartFilledIcon } from 'assets/svgs';
import { API } from '../../utils/constants';

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

  return (
    <div css={profileBoxStyle}>
      <div css={profileBoxTopStyle}>
        <span>#{requirements.length > 0 ? requirements[0] : '동료가 되고 싶어요!'}</span>
        <span>#{requirements.length > 1 ? requirements[1] : '함께해요!'}</span>
      </div>
      <SummarizedCodeBox language={language} code={code} />
      <div css={profileBoxBottomStyle}>
        <span>{skills.slice(0, 3).map((skill: string) => `${skill}\n`)}</span>
        <button type='button' onClick={handleLikeClick} css={favoriteButtonStyle}>
          {like ? <HeartFilledIcon css={favoriteIconStyle} /> : <HeartEmptyIcon css={favoriteIconStyle} />}
        </button>
      </div>
    </div>
  );
};

export default Profile;
