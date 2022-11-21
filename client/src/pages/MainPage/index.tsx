/** @jsxImportSource @emotion/react */

import { MiniNavBar } from 'common';
import ProfileList from './ProfileList';

// /api/profile?stack=frontend&filter1=A&filter2=B&filter3=C&liked=true&pages=1

export const MainPage = () => {
  // MiniNavBar 사용례: 저렇게 투명 태그로 감싸 넣어야 space-between 잘 반영 됩니다
  return (
    <>
      <MiniNavBar>
        <>
          <span>얼리버드</span>
          <button type='button'>버튼</button>
        </>
      </MiniNavBar>
      <ProfileList />
    </>
  );
};
