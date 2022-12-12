/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Pagination from 'react-js-pagination';

import { InterestInput, TechStackInput, MiniNavBar, Button } from 'common';
import { fetchFilteredData } from './fetchFilteredData';
import { singleProfileData } from './types';
import { LINK } from 'utils/constants';
import { ProfileList } from './ProfileList';
import { currentUserState } from 'store/currentUserState';

import { paginationStyle } from './styles';
import {
  dropdownWrapperStyle,
  filterIconStyle,
  inputWrapperStyle,
  interestBoxStyle,
  likedCheckStyle,
  searchButtonStyle,
  searchButtonWrapperStyle,
  techStackBoxStyle,
} from './NavBar.styles';

import { FilterIcon, SearchIcon } from 'assets/svgs';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const MainPage = () => {
  const query = useQuery();
  const queryPage = query.get('page');
  const nav = useNavigate();
  const { id: currentUserId } = useRecoilValue(currentUserState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [likedFilter, setLikedFilter] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<Array<singleProfileData>>([]);
  const [totalNumOfData, setTotalNumOfData] = useState<number>(6);

  // dep가 없고, 간단한 함수라 useCallback 처리함
  const handleLikeCheck = useCallback(() => {
    setLikedFilter((prevState) => !prevState);
  }, []);

  // 기능상 별도 분리하였고 컴포넌트 리랜더링 시마다가 새로 생성될 필요가 없으나 자주 실행될 수 있고 로직이 꽤 포함되어있어, useCallback 처리함
  const getFilteredData = useCallback(
    async (interestChosen: string, techStackChosen: string[], likedFilterChosen: boolean, searchPage: number) => {
      const paramObject: { [index: string]: string } = {};
      if (interestChosen.length > 0) paramObject.interest = interestChosen;
      if (techStackChosen.length > 0) {
        techStackChosen.forEach((skill, i) => {
          paramObject[`skill${i + 1}`] = skill;
        });
      }
      if (likedFilterChosen) paramObject.liked = 'true';
      paramObject.page = `${searchPage}`;
      await fetchFilteredData(paramObject).then((data) => {
        setProfileData(data?.list ?? []);
        setTotalNumOfData(data?.totalNumOfData ?? 0);
      });
    },
    []
  );

  // dependencies가 많아, useCallback의 의미가 없다고 판단함
  const handleSearchClick = async () => {
    await getFilteredData(interest, techStack, likedFilter, 1);
  };

  // 페이지 변경 handler
  const handlePageChange = async (page: number) => {
    nav(`${LINK.MAIN}?page=${page}`);
  };

  // 쿼리스트링으로 페이지 상태 관리
  useEffect(() => {
    const setPage = async () => {
      if (queryPage !== null) {
        setCurrentPage(Number(queryPage));
        return;
      }
      setCurrentPage(1);
    };
    setPage();
  }, [queryPage]);

  // 데이터 받아오기
  useEffect(() => {
    const getData = async () => {
      await getFilteredData(interest, techStack, likedFilter, currentPage);
    };
    getData();
  }, [currentPage]);

  return (
    <>
      <MiniNavBar>
        <>
          <FilterIcon css={filterIconStyle} />
          <div css={inputWrapperStyle}>
            <div css={dropdownWrapperStyle}>
              <InterestInput interest={interest} setInterest={setInterest} css={interestBoxStyle} />
              <TechStackInput techStack={techStack} setTechStack={setTechStack} css={techStackBoxStyle} />
            </div>
            <div css={searchButtonWrapperStyle}>
              {currentUserId && (
                <div css={likedCheckStyle}>
                  <input id='liked-check' type='checkbox' onChange={handleLikeCheck} />
                  <label htmlFor='liked-check'>좋아요 목록보기</label>
                </div>
              )}
              <Button ariaLabel='찾기' css={searchButtonStyle} onClick={handleSearchClick}>
                <SearchIcon />
              </Button>
            </div>
          </div>
        </>
      </MiniNavBar>
      <ProfileList profileData={profileData} />
      {/* Pagination에 직접적으로 css 속성을 넣을 수 없어, 한 번 감싸줌 */}
      <div css={paginationStyle}>
        <Pagination
          activePage={currentPage}
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
