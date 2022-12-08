/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

import { InterestInput, TechStackInput, MiniNavBar, Button } from 'common';
import ProfileList from './ProfileList';
import { fetchFilteredData } from './service';
import { singleProfileData } from './types';

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
  const [profileData, setProfileData] = useState<Array<singleProfileData>>([]);
  const [page, setPage] = useState<number>(1);
  const [totalNumOfData, setTotalNumOfData] = useState<number>(6);

  // dep가 없고, 간단한 함수라 useCallback 처리함
  const handleLikeCheck = useCallback(() => {
    setLikedFilter((prevState) => prevState);
  }, []);

  // 기능상 별도 분리하였고 컴포넌트 리랜더링 시마다가 새로 생성될 필요가 없으나 자주 실행될 수 있고 로직이 꽤 포함되어있어, useCallback 처리함
  const getFilteredData = useCallback(
    async (interestChosen: string, techStackChosen: string[], likedFilterChosen: boolean, pageChosen: number) => {
      const paramObject: { [index: string]: string } = {};
      if (interestChosen.length > 0) paramObject.interest = interestChosen;
      if (techStackChosen.length > 0) {
        techStackChosen.forEach((skill, i) => {
          paramObject[`skill${i + 1}`] = skill;
        });
      }
      if (likedFilterChosen) paramObject.liked = 'true';
      paramObject.page = `${pageChosen}`;
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

  // 맨 처음에 데이터 받아오기 -> 백엔드와 논의 필요(최신 순 데이터를 받아오는 것으로 논의됨)
  useEffect(() => {
    const getPageData = async () => {
      await getFilteredData(interest, techStack, likedFilter, page);
    };
    getPageData();
  }, [page]);

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
