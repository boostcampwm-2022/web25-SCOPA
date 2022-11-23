/** @jsxImportSource @emotion/react */

import { useParams } from 'react-router-dom';

import { MiniNavBar } from 'common';
import { CodeBox, TopProfileBox, BottomProfileBox } from './ViewMode';

import { detailProfileWrapperStyle, editButtonStyle, nicknameSpanStyle } from './styles';

import { PencilIcon } from 'assets/svgs';

const MockUpData = {
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
  language: 'typescript',
  interest: 'frontend',
  skills: ['React', 'Emotion', 'Typescript'],
  requirements: ['잠실사는사람만', '소통좋아해요'],
  liked: false,
  worktype: '페어 프로그래밍, 잠실역 근처',
  worktime: '새벽은 타협 가능하고 오후 1시부터 항상 비어있어요',
  email: 'earlybird@boostcamp.org',
};

export const DetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <MiniNavBar>
        <>
          <span css={nicknameSpanStyle}>{id}</span>
          <button type='button' css={editButtonStyle}>
            <PencilIcon />
          </button>
        </>
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        <CodeBox code={MockUpData.code} language={MockUpData.language} />
        <TopProfileBox interest={MockUpData.interest} techStack={MockUpData.skills} />
        <BottomProfileBox
          workType={MockUpData.worktype}
          workTime={MockUpData.worktime}
          email={MockUpData.email}
          requirements={MockUpData.requirements}
        />
      </div>
    </>
  );
};
