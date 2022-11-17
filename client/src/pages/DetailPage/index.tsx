/** @jsxImportSource @emotion/react */

import { useParams } from 'react-router-dom';

import { MiniNavBar } from 'common';
import { CodeBox } from './CodeBox';

import { detailProfileWrapperStyle } from './styles';

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
  skills: ['React', 'Emotion', 'Typescript'],
  requirements: ['잠실사는사람만', '소통좋아해요'],
  liked: false,
};

export const DetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <MiniNavBar>
        <>
          <span>{id}</span>
          <button type='button'>
            <PencilIcon />
          </button>
        </>
      </MiniNavBar>
      <div css={detailProfileWrapperStyle}>
        <CodeBox code={MockUpData.code} language={MockUpData.language} />
        <div>어쩌구</div>
        <div>저쩌구</div>
      </div>
    </>
  );
};
