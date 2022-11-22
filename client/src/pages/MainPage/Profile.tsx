/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';

import { HeartEmptyIcon, HeartFilledIcon } from '../../assets/svgs';
import { css } from '@emotion/react';
import { COLORS } from '../../styles/colors';
import { COMMON_SIZE } from '../../styles/sizes';
import SummarizedCodeBox from './SummarizedCodeBox';
import { profileDatum } from './types';

const profileBoxStyle = css({
  width: 'calc((100% / 3) - 40px)',
  minWidth: 350,
  display: 'grid',
  gridTemplateRows: '1fr 10fr 1fr',
  flexGrow: 1,
  height: '95%',
  padding: 20,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.SECONDARY_1,
});

const profileBoxTopStyle = css({
  color: COLORS.TEXT_1,
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});

const profileBoxBottomStyle = css({
  color: COLORS.TEXT_1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  fontWeight: 'bold',
});

const Profile = ({ id, language, code, skills, requirements, liked }: profileDatum) => {
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
        <span>#{requirements[0]}</span>
        <span>#{requirements[1]}</span>
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
