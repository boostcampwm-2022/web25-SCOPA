import { MiniNavBar } from 'common';

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
      <div>내용내용내용</div>
    </>
  );
};
