/** @jsxImportSource @emotion/react */

import { useCallback, useState } from 'react';

import { MiniNavBar } from 'common';
import ProfileList from './ProfileList';
import InterestFilter from './InterestFilter';
import TechStackFilter from './TechStackFilter';

import { likedCheckStyle, mainPageMenuBarStyle } from './styles';

import { SearchIcon } from 'assets/svgs';

import { mockData } from './mockData';
import { API } from '../../utils/constants';

export const MainPage = () => {
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [likedFilter, setLikedFilter] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<Array<Object>>([]);
  const [page, setPage] = useState<number>(1);

  // dep가 없고, 간단한 함수라 useCallback 처리함
  const handleCheck = useCallback(() => {
    setLikedFilter((prevState) => prevState);
  }, []);

  // 기능상 별도 분리하였고 컴포넌트 리랜더링 시마다가 새로 생성될 필요가 없으나 자주 실행될 수 있고 로직이 꽤 포함되어있어, useCallback 처리함
  const requestFilteredData = useCallback(
    (interestChosen: string, techStackChosen: string[], likedFilterChosen: boolean, pageChosen: number) => {
      const paramObject: { [index: string]: string } = {};
      paramObject.interest = interestChosen;
      if (techStackChosen.length > 0) {
        // eslint-disable-next-line no-return-assign
        techStackChosen.forEach((stack, i) => (paramObject[`stack${i}`] = stack));
      }
      if (likedFilterChosen) paramObject.liked = 'true';
      paramObject.page = `${page}`;
      fetch(`${process.env.REACT_APP_FETCH_URL}${API.PROFILE}?${new URLSearchParams(paramObject)}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            setProfileData(res.data.lists);
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
    if (interest.length === 0) return;
    requestFilteredData(interest, techStack, likedFilter, page);
  };

  return (
    // 투명 태그로 감싸 넣어야 space-between 잘 반영 됨
    <>
      <MiniNavBar>
        <div css={mainPageMenuBarStyle}>
          <InterestFilter interest={interest} setInterest={setInterest} />
          <TechStackFilter techStack={techStack} setTechStack={setTechStack} />
          <button type='button' onClick={handleClick}>
            <SearchIcon />
          </button>
          <div css={likedCheckStyle}>
            <input id='liked-check' type='checkbox' onChange={handleCheck} />
            <label htmlFor='liked-check'>좋아요 목록보기</label>
          </div>
        </div>
      </MiniNavBar>
      <ProfileList profileData={mockData} />
    </>
  );
};
