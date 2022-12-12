/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';

import { InterestInput, TechStackInput, MiniNavBar, Button } from 'common';
import { fetchFilteredData } from './fetchFilteredData';
import { singleProfileData } from './types';
import { LINK } from 'utils/constants';
import { ProfileList } from './ProfileList';

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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const MainPage = () => {
  const query = useQuery();
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(0);
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
  const getFilteredData = async (paramObject: URLSearchParams) => {
    await fetchFilteredData(paramObject).then((data) => {
      setProfileData(data?.list ?? []);
      setTotalNumOfData(data?.totalNumOfData ?? 0);
    });
  };

  const handleSearchClick = () => {
    const paramObject: { [index: string]: string } = {};
    if (interest.length > 0) paramObject.interest = interest;
    if (techStack.length > 0) {
      techStack.forEach((skill, i) => {
        paramObject[`skill${i + 1}`] = skill;
      });
    }
    if (likedFilter) paramObject.liked = 'true';
    paramObject.page = `1`;
    nav(`${LINK.MAIN}?${new URLSearchParams(paramObject)}`);
  };

  const handlePageChange = (page: number) => {
    query.delete('page');
    query.append('page', String(page));
    nav(`${LINK.MAIN}?${query}`);
  };

  // 쿼리스트링으로 상태값 업데이트
  useEffect(() => {
    const queryValues: Record<string, any> = {
      page: 1,
      interest: '',
      techStack: [],
      liked: false,
    };
    if (query.get('page')) queryValues.page = Number(query.get('page'));
    if (query.get('interest')) queryValues.interest = query.get('interest');
    if (query.get('skill1')) queryValues.techStack.push(query.get('skill1'));
    if (query.get('skill2')) queryValues.techStack.push(query.get('skill2'));
    if (query.get('skill3')) queryValues.techStack.push(query.get('skill3'));
    if (query.get('liked')) queryValues.liked = true;

    setCurrentPage(queryValues.page);
    setInterest(queryValues.interest);
    setTechStack(queryValues.techStack);
    setLikedFilter(queryValues.liked);

    const getData = async () => {
      await getFilteredData(query);
    };
    getData();
  }, [
    query.get('page'),
    query.get('interest'),
    query.get('skill1'),
    query.get('skill2'),
    query.get('skill3'),
    query.get('liked'),
  ]);

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
              <input id='liked-check' type='checkbox' onChange={handleLikeCheck} checked={likedFilter} />
              <label htmlFor='liked-check'>좋아요 목록보기</label>
            </div>
          </div>
          <Button ariaLabel='찾기' css={searchButtonStyle} onClick={handleSearchClick}>
            <SearchIcon />
          </Button>
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
