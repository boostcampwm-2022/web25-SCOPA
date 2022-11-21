/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';

import { HeartEmptyIcon, HeartFilledIcon } from '../../assets/svgs';
import { css } from '@emotion/react';
import { COLORS } from '../../styles/colors';
import { COMMON_SIZE } from '../../styles/sizes';
import SummarizedCodeBox from './SummarizedCodeBox';

interface Props {
  id: string;
  code: string;
  skills: Array<string>;
  requirements: Array<string>;
  liked: boolean;
}

const profileBoxStyle = css({
  width: 'calc((100% / 3) - 40px)',
  maxWidth: 'calc((100% / 2) - 40px)',
  minWidth: 300,
  display: 'grid',
  gridTemplateRows: '1fr 9fr 1fr',
  flexGrow: 1,
  height: '100%',
  padding: 20,
  borderRadius: COMMON_SIZE.BORDER_RADIUS,
  backgroundColor: COLORS.SECONDARY_1,
});

const requirementsStyle = css({
  color: COLORS.TEXT_1,
  fontWeight: 'bold',
  display: 'flex',
  gap: 10,
});

const Profile = ({ id, code, skills, requirements, liked }: Props) => {
  const [like, setLike] = useState(liked);

  const handleLikeClick = useCallback(() => {
    // Like 버튼 클릭 여부를 서버에 보내기
    // /api/like (POST) /api/like (DELETE)
    // likedId: '' // 좋아요한 상대방의 아이디
    setLike((prevState) => !prevState);
  }, [like]);

  return (
    <div css={profileBoxStyle}>
      <div css={requirementsStyle}>
        <span>#{requirements[0]}</span>
        <span>#{requirements[1]}</span>
      </div>
      <SummarizedCodeBox code={code} />
      <div>
        <span>{skills}</span>
        <button type='button' onClick={handleLikeClick}>
          {like ? <HeartFilledIcon /> : <HeartEmptyIcon />}
        </button>
      </div>
    </div>
  );
};

export default Profile;
