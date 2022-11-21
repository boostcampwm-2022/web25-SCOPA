/** @jsxImportSource @emotion/react */

import { MiniNavBar } from 'common';
import ProfileList from './ProfileList';
import { css } from '@emotion/react';

// /api/profile?stack=frontend&filter1=A&filter2=B&filter3=C&liked=true&pages=1

export const MainPage = () => {
  const mockData = [
    {
      id: '1',
      language: 'JavaScript',
      code: `export const DetailPage = () => {
  const { id } = useParams();
    return (
    <div>
      <MiniNavBar>
        <>
          <span>{id}</span>
          <button type='button'>
            <PencilIcon />
          </button>
        </>
      </MiniNavBar>
      상세페이지임 암튼그럼ㅋㅋ
    </div>
  );
};`,
      skills: ['React', 'Emotion', 'Typescript'],
      requirements: ['잠실사는사람만', '소통좋아해요'],
      liked: false,
    },
    {
      id: '2',
      language: 'JavaScript',
      code: `export const DetailPage = () => {
  const { id } = useParams();
    return (
    <div>
      <MiniNavBar>
        <>
          <span>{id}</span>
          <button type='button'>
            <PencilIcon />
          </button>
        </>
      </MiniNavBar>
      상세페이지임 암튼그럼ㅋㅋ
    </div>
  );
};`,
      skills: ['React', 'Emotion', 'Typescript'],
      requirements: ['잠실사는사람만', '소통좋아해요'],
      liked: false,
    },
    {
      id: '3',
      language: 'JavaScript',
      code: `export const DetailPage = () => {
  const { id } = useParams();
    return (
    <div>
      <MiniNavBar>
        <>
          <span>{id}</span>
          <button type='button'>
            <PencilIcon />
          </button>
        </>
      </MiniNavBar>
      상세페이지임 암튼그럼ㅋㅋ
    </div>
  );
};`,
      skills: ['React', 'Emotion', 'Typescript'],
      requirements: ['잠실사는사람만', '소통좋아해요'],
      liked: false,
    },
  ];

  // MiniNavBar 사용례: 저렇게 투명 태그로 감싸 넣어야 space-between 잘 반영 됩니다
  return (
    <>
      <MiniNavBar>
        <>
          <span>얼리버드</span>
          <button type='button'>버튼</button>
        </>
      </MiniNavBar>
      <ProfileList profileData={mockData} />
    </>
  );
};
