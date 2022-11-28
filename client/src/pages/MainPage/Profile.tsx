/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';

import SummarizedCodeBox from './SummarizedCodeBox';
import { singleProfileData } from './types';

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
      <SummarizedCodeBox language={language} code={code} />
      <div css={profileBoxBottomStyle}>
        <div css={textWrapperStyle}>
          <div css={topTextStyle}>
            <span>#{requirements[0] ?? '동료가 되고 싶어요!'}</span>
            <span>#{requirements[1] ?? '함께해요!'}</span>
          </div>
          <span css={bottomTextStyle}>{skills.slice(0, 3).map((skill: string) => `${skill}\n`)}</span>
        </div>
        <button type='button' onClick={handleLikeClick} css={favoriteButtonStyle}>
          {like ? <HeartFilledIcon css={favoriteIconStyle} /> : <HeartEmptyIcon css={favoriteIconStyle} />}
        </button>
      </div>
    </div>
  );
};

export default Profile;
