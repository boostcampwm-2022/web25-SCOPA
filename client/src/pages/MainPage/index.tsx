/** @jsxImportSource @emotion/react */

import { MiniNavBar } from 'common';
import ProfileList from './ProfileList';
import { css } from '@emotion/react';
import InterestFilter from './InterestFilter';
import TechStackFilter from './TechStackFilter';
import { mockData } from './mockData';
import { COLORS } from '../../styles/colors';
import { COMMON_SIZE, FONT_SIZE } from '../../styles/sizes';
import { useState } from 'react';
import { SearchIcon } from '../../assets/svgs';

const likedCheckStyle = css({
  color: COLORS.TEXT_1,
  fontSize: FONT_SIZE.SMALL,
});
const mainPageMenuBarStyle = css({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '3fr 5fr 1fr 3fr',
  alignItems: 'center',
  justifyItems: 'center',
});

export const MainPage = () => {
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [likedFilter, setLikedFilter] = useState<boolean>(false);
  // /api/profile?stack=frontend&filter1=A&filter2=B&filter3=C&liked=true&pages=1
  // MiniNavBar 사용례: 저렇게 투명 태그로 감싸 넣어야 space-between 잘 반영 됩니다
  return (
    <>
      <MiniNavBar>
        <div css={mainPageMenuBarStyle}>
          <InterestFilter />
          <TechStackFilter />
          <button type='button'>
            <SearchIcon />
          </button>
          <div css={likedCheckStyle}>
            <input id='liked-check' type='checkbox' />
            <label htmlFor='liked-check'>좋아요 목록보기</label>
          </div>
        </div>
      </MiniNavBar>
      <ProfileList profileData={mockData} />
    </>
  );
};
