/** @jsxImportSource @emotion/react */

import { useState } from 'react';

import { MiniNavBar } from 'common';
import ProfileList from './ProfileList';
import InterestFilter from './InterestFilter';
import TechStackFilter from './TechStackFilter';

import { likedCheckStyle, mainPageMenuBarStyle } from './styles';

import { SearchIcon } from '../../assets/svgs';

import { mockData } from './mockData';

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
