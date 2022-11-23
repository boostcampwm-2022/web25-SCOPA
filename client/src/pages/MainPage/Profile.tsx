/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';

import SummarizedCodeBox from './SummarizedCodeBox';
import { singleProfileData } from './types';

import { profileBoxBottomStyle, profileBoxStyle, profileBoxTopStyle } from './styles';

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

  const handleLikeClick = useCallback(() => {
    // Like 버튼 클릭 여부를 서버에 보내기
    // /api/like (POST) /api/like (DELETE)
    // likedId: '' // 좋아요한 상대방의 아이디
    setLike((prevState) => !prevState);
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
        <button type='button' onClick={handleLikeClick}>
          {like ? <HeartFilledIcon /> : <HeartEmptyIcon />}
        </button>
      </div>
    </div>
  );
};

export default Profile;
