/** @jsxImportSource @emotion/react */

import { useState } from 'react';

import { InterestInput, TechStackInput, MiniNavBar, Button } from 'common';
import ProfileList from './ProfileList';

import {} from './styles';
import {
  filterIconStyle,
  inputWrapperStyle,
  interestBoxStyle,
  likedCheckStyle,
  searchButtonStyle,
  techStackBoxStyle,
} from './NavBar.styles';

import { mockData } from './mockData';
import { FilterIcon, SearchIcon } from 'assets/svgs';

export const MainPage = () => {
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [likedFilter, setLikedFilter] = useState<boolean>(false);
  // /api/profile?stack=frontend&filter1=A&filter2=B&filter3=C&liked=true&pages=1
  // MiniNavBar 사용례: 저렇게 투명 태그로 감싸 넣어야 space-between 잘 반영 됩니다
  return (
    <>
      <MiniNavBar>
        <>
          <FilterIcon css={filterIconStyle} />
          <div css={inputWrapperStyle}>
            <InterestInput interest={interest} setInterest={setInterest} css={interestBoxStyle} />
            <TechStackInput techStack={techStack} setTechStack={setTechStack} css={techStackBoxStyle} />
            <div css={likedCheckStyle}>
              <input id='liked-check' type='checkbox' />
              <label htmlFor='liked-check'>좋아요 목록보기</label>
            </div>
          </div>
          <Button css={searchButtonStyle}>
            <SearchIcon />
          </Button>
        </>
      </MiniNavBar>
      <ProfileList profileData={mockData} />
    </>
  );
};
