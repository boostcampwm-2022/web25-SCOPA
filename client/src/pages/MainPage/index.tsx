/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

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
import { singleProfileData } from './types';
import { API } from 'utils/constants';

import { paginationStyle, likedCheckStyle, mainPageMenuBarStyle } from './styles';

import { SearchIcon } from 'assets/svgs';
import { FilterIcon, SearchIcon } from 'assets/svgs';

export const MainPage = () => {
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [likedFilter, setLikedFilter] = useState<boolean>(false);
  // 현재는 화면때문에, mockData를 default값으로 넣어둠. 나중에 서버 API 만들어지면, []로 변경 필요
  const [profileData, setProfileData] = useState<Array<singleProfileData>>(mockData);
  const [page, setPage] = useState<number>(1);
  const [totalNumOfData, setTotalNumOfData] = useState<number>(100);

  // dep가 없고, 간단한 함수라 useCallback 처리함
  const handleCheck = useCallback(() => {
    setLikedFilter((prevState) => prevState);
  }, []);

  // 기능상 별도 분리하였고 컴포넌트 리랜더링 시마다가 새로 생성될 필요가 없으나 자주 실행될 수 있고 로직이 꽤 포함되어있어, useCallback 처리함
  const requestFilteredData = useCallback(
    (interestChosen: string, techStackChosen: string[], likedFilterChosen: boolean, pageChosen: number) => {
      // URLSearchParams의 constructor에 넣어줄 객체
      const paramObject: { [index: string]: string } = {};
      // interest는 필수선택이나, 처음 로딩 시에는 없을 수 있음
      if (interest.length > 0) paramObject.interest = interestChosen;
      // 기술스텍은 선택적이므로 있을 시에 그 개수만큼(최대3개) 추가해줌
      if (techStackChosen.length > 0) {
        // eslint-disable-next-line no-return-assign
        techStackChosen.forEach((stack, i) => (paramObject[`stack${i}`] = stack));
      }
      // 좋아요 목록보기도 선택사항임
      if (likedFilterChosen) paramObject.liked = 'true';
      // 페이지를 함께 요청
      paramObject.page = `${pageChosen}`;
      fetch(`${process.env.REACT_APP_FETCH_URL}${API.PROFILE}?${new URLSearchParams(paramObject)}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            setProfileData(res.data.list);
            setTotalNumOfData(res.data.totalNumOfData);
          } else alert('잠시 후 다시 시도해주시기 바랍니다.');
        })
        .catch(() => {
          alert('잠시 후 다시 시도해주시기 바랍니다.');
        });
    },
    []
  );

  // dependencies가 많아, useCallback의 의미가 없다고 판단함
  const handleClick = () => {
    // 관심분야는 필수선택이므로, 없을 시 작동하지 않음
    if (interest.length === 0) {
      alert('관심분야는 필수선택입니다.');
      return;
    }
    requestFilteredData(interest, techStack, likedFilter, page);
  };

  // 페이지 변경 handler
  const handlePageChange = (pageVal: number) => {
    setPage(pageVal);
  };

  // 맨 처음에 데이터 받아오기 -> 백엔드와 논의 필요(최신 순 데이터를 받아오는 것으로 일단 논의됨)
  useEffect(() => {
    requestFilteredData(interest, techStack, likedFilter, page);
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
              <input id='liked-check' type='checkbox' />
              <label htmlFor='liked-check'>좋아요 목록보기</label>
            </div>
          </div>
          <Button css={searchButtonStyle}>
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
