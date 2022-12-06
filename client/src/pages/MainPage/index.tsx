/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

import { InterestInput, TechStackInput, MiniNavBar, Button } from 'common';
import ProfileList from './ProfileList';
import { fetchFilteredData } from './service';
import { singleProfileData } from './types';
import { mockData } from './mockData';

import { paginationStyle } from './styles';
import {
  filterIconStyle,
  inputWrapperStyle,
  interestBoxStyle,
  likedCheckStyle,
  searchButtonStyle,
  techStackBoxStyle,
} from './NavBar.styles';

import { FilterIcon, SearchIcon } from 'assets/svgs';

export const MainPage = () => {
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [likedFilter, setLikedFilter] = useState<boolean>(false);
  // 개발 단계에서 레이아웃을 확인하기 위해, default값으로 mockData를 넣어둠
  // Todo: 개발이 끝난 후, mockData -> []로 변경필요
  const [profileData, setProfileData] = useState<Array<singleProfileData>>(mockData);
  const [page, setPage] = useState<number>(1);
  const [totalNumOfData, setTotalNumOfData] = useState<number>(6);

  // dep가 없고, 간단한 함수라 useCallback 처리함
  const handleLikeCheck = useCallback(() => {
    setLikedFilter((prevState) => prevState);
  }, []);

  // 기능상 별도 분리하였고 컴포넌트 리랜더링 시마다가 새로 생성될 필요가 없으나 자주 실행될 수 있고 로직이 꽤 포함되어있어, useCallback 처리함
  const getFilteredData = useCallback(
    async (interestChosen: string, techStackChosen: string[], likedFilterChosen: boolean, pageChosen: number) => {
      // URLSearchParams의 constructor에 넣어줄 객체
      const paramObject: { [index: string]: string } = {};
      // interest는 없을 수 있음
      if (interestChosen.length > 0) paramObject.interest = interestChosen;
      // 기술스텍은 선택적이므로 있을 시에 그 개수만큼(최대3개) 추가해줌
      if (techStackChosen.length > 0) {
        // eslint-disable-next-line no-return-assign
        techStackChosen.forEach((skill, i) => (paramObject[`skill${i}`] = skill));
      }
      // 좋아요 목록보기도 선택사항임
      if (likedFilterChosen) paramObject.liked = 'true';
      // 페이지를 함께 요청
      paramObject.page = `${pageChosen}`;
      // fetch함수를 통해 데이터를 받아와서 바꿔줌
      await fetchFilteredData({ setProfileData, setTotalNumOfData, paramObject });
    },
    []
  );

  // dependencies가 많아, useCallback의 의미가 없다고 판단함
  const handleSearchClick = async () => {
    await getFilteredData(interest, techStack, likedFilter, page);
  };

  // 페이지 변경 handler
  const handlePageChange = async (pageVal: number) => {
    await setPage(pageVal);
    await getFilteredData(interest, techStack, likedFilter, page);
  };

  return (
    // 투명 태그로 감싸 넣어야 space-between 잘 반영 됨
    <>
      <MiniNavBar>
        <>
          <FilterIcon css={filterIconStyle} />
          <div css={inputWrapperStyle}>
            <InterestInput interest={interest} setInterest={setInterest} css={interestBoxStyle} />
            <TechStackInput techStack={techStack} setTechStack={setTechStack} css={techStackBoxStyle} />
            <div css={likedCheckStyle}>
              <input id='liked-check' type='checkbox' onChange={handleLikeCheck} />
              <label htmlFor='liked-check'>좋아요 목록보기</label>
            </div>
          </div>
          <Button css={searchButtonStyle} onClick={handleSearchClick}>
            <SearchIcon />
          </Button>
        </>
      </MiniNavBar>
      <ProfileList profileData={profileData} />
      {/* Pagination에 직접적으로 css 속성을 넣을 수 없어, 한 번 감싸줌 */}
      <div css={paginationStyle}>
        <Pagination
          activePage={page}
          itemsCountPerPage={6}
          totalItemsCount={totalNumOfData}
          pageRangeDisplayed={5}
          prevPageText='‹'
          nextPageText='›'
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};
