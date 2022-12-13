/** @jsxImportSource @emotion/react */

import { useRecoilValue } from 'recoil';
import Pagination from 'react-js-pagination';

import { InterestInput, TechStackInput, MiniNavBar, Button } from 'common';
import { ProfileList } from './ProfileList';
import { useSetMainPageData } from './useSetMainPageData';
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

export const MainPage = () => {
  const { id: currentUserId } = useRecoilValue(currentUserState);
  const {
    interest,
    setInterest,
    techStack,
    setTechStack,
    likedFilter,
    currentPage,
    profileData,
    totalNumOfData,
    handleChangeLike,
    handleClickSearchButton,
    handleChangePageNumber,
  } = useSetMainPageData();

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
                  <input id='liked-check' type='checkbox' checked={likedFilter} onChange={handleChangeLike} />
                  <label htmlFor='liked-check'>좋아요 목록보기</label>
                </div>
              )}
              <Button ariaLabel='찾기' css={searchButtonStyle} onClick={handleClickSearchButton}>
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
          onChange={handleChangePageNumber}
        />
      </div>
    </>
  );
};
